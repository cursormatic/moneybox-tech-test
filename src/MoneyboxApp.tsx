import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from './components/button/button.tsx';
import { Category } from './components/category/category.tsx';
import { AddCategoryForm } from './components/forms/addCategory/addCategoryForm.tsx';
import { Page } from './components/page/page.tsx';
import { actions } from './store/categories/categories.ts';

import './MoneyboxApp.css';

import type { AppState } from './store/AppState.ts';

import type { Categories, CategoriesState } from './store/categories/typings.ts';

function MoneyboxApp() {
  const dispatch = useDispatch();
  const categories = useSelector<AppState, CategoriesState>(state => state.categories);
  const [toggleCategoriesModal, setToggleCategoriesModal] = useState(false);

  const availableCategories = useMemo(
    () => categories.availableCategories.filter(cat => !categories.ids.includes(cat)),
    [categories.availableCategories, categories.ids]
  );

  const toggleModal = useCallback(() => setToggleCategoriesModal(prev => !prev), []);

  const addCategoryHandler = useCallback(
    (category: Categories) => {
      toggleModal();
      dispatch(actions.addCategory({ title: category, type: category }));
    },
    [dispatch, toggleModal]
  );

  const deleteCategoryHandler = useCallback(
    (category: Categories) => () => {
      dispatch(actions.deleteCategory(category));
    },
    [dispatch]
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
          onClick={toggleModal}
          disabled={!availableCategories.length}
        />
      </div>
      <div className="mb-grid flex row">
        {categories.ids.map(category => (
          <Category title={category} products={[]} deleteCategoryHandler={deleteCategoryHandler(category)} />
        ))}
      </div>
      <Modal isOpen={toggleCategoriesModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true}>
        <AddCategoryForm categories={availableCategories} callback={addCategoryHandler} />
      </Modal>
    </Page>
  );
}

export default MoneyboxApp;
