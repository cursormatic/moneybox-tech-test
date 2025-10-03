import { useMediaQuery } from '@uidotdev/usehooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { Button } from './components/button/button.tsx';
import { Category } from './components/category/category.tsx';
import { AddCategoryForm } from './components/forms/addCategory/addCategoryForm.tsx';
import { Page } from './components/page/page.tsx';
import { actions } from './store/categories/categories.ts';

import './moneyboxApp.css';

import { AddProductForm } from './components/forms/addProduct/addProductForm.tsx';
import type { AppState } from './store/AppState.ts';

import type { ProductTypes } from './components/product/typings.ts';
import type { Categories, CategoriesState } from './store/categories/typings.ts';

function MoneyboxApp() {
  const dispatch = useDispatch();
  const categories = useSelector<AppState, CategoriesState>(state => state.categories);
  const [toggleCategoriesModal, setToggleCategoriesModal] = useState(false);
  const [toggleProductsModal, setToggleProductsModal] = useState(false);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  const availableCategories = useMemo(
    () => categories.availableCategories.filter(cat => !categories.ids.includes(cat)),
    [categories.availableCategories, categories.ids]
  );

  const availableProducts = useMemo(() => {
    const products = categories.categoryMap[categories.selectedCategory];
    const entityProducts = categories.entities[categories.selectedCategory]?.products?.map(({ type }) => type) ?? [];
    return products.filter(prod => !entityProducts.includes(prod));
  }, [categories.categoryMap, categories.selectedCategory, categories?.entities]);

  const disableAddProduct = useCallback(
    (category: Categories) => {
      return categories.categoryMap[category].length === categories.entities[category]?.products?.length;
    },
    [categories.categoryMap, categories.entities]
  );

  const toggleAddCategoryModal = useCallback(() => setToggleCategoriesModal(prev => !prev), []);

  const toggleAddProductModal = useCallback(() => setToggleProductsModal(prev => !prev), []);

  const addCategoryHandler = useCallback(
    (category: Categories) => {
      toggleAddCategoryModal();
      dispatch(actions.addCategory({ title: category, type: category }));
    },
    [dispatch, toggleAddCategoryModal]
  );

  const deleteCategoryHandler = useCallback(
    (category: Categories) => () => {
      dispatch(actions.deleteCategory(category));
    },
    [dispatch]
  );

  const setSelectedCategoryHandler = useCallback(
    (category: Categories) => () => {
      dispatch(actions.selectedCategory(category));
      setToggleProductsModal(prev => !prev);
    },
    [dispatch]
  );

  const addProductHandler = useCallback(
    ({ type, description }: { type: ProductTypes; description: string }) => {
      dispatch(
        actions.addProduct({ title: type, type, description, category: categories.selectedCategory as Categories })
      );
      setToggleProductsModal(prev => !prev);
    },
    [dispatch, categories.selectedCategory]
  );

  const deleteProductHandler = useCallback(
    (category: string) => (product: string) => dispatch(actions.deleteProduct({ category, product })),
    [dispatch]
  );

  const categoriesList = useMemo(
    () =>
      categories.ids.map(category => (
        <Category
          key={category}
          title={category}
          products={categories.entities[category].products}
          deleteCategoryHandler={deleteCategoryHandler(category)}
          deleteProductHandler={deleteProductHandler(category)}
          addProductHandler={setSelectedCategoryHandler(category)}
          disableAddProduct={disableAddProduct(category)}
        />
      )),
    [
      categories.entities,
      categories.ids,
      deleteCategoryHandler,
      deleteProductHandler,
      disableAddProduct,
      setSelectedCategoryHandler
    ]
  );

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Page>
      <div className="mb-4 text-center">
        <Button
          size="medium"
          primary
          label="Add Category"
          onClick={toggleAddCategoryModal}
          disabled={!availableCategories.length}
        />
      </div>
      {isSmallDevice ? (
        <Slider
          {...{
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          }}
        >
          {categoriesList}
        </Slider>
      ) : (
        <div className="mb-grid flex row">{categoriesList}</div>
      )}
      <Modal
        isOpen={toggleCategoriesModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleAddCategoryModal}
        className="mb-add-category-modal"
      >
        <AddCategoryForm categories={availableCategories} callback={addCategoryHandler} />
      </Modal>
      <Modal
        isOpen={toggleProductsModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleAddProductModal}
        className="mb-add-product-modal"
      >
        <AddProductForm products={availableProducts} callback={addProductHandler} />
      </Modal>
    </Page>
  );
}

export default MoneyboxApp;
