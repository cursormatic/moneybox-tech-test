import { describe, expect, it } from 'vitest';

import reducer, { actions, initialState } from './categories';

describe('categories slice', () => {
  it('should return the initial state when passed an unknown action', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('addCategory adds a new empty category entity and id', () => {
    const next = reducer(initialState, actions.addCategory({ title: 'Investing products', type: 'Investing' }));

    expect(next.entities['Investing']).toEqual({
      type: 'Investing',
      title: 'Investing products',
      products: []
    });
    expect(next.ids).toContain('Investing');
  });

  it('deleteCategory removes entity and id', () => {
    const withCategory = reducer(
      {
        ...initialState,
        entities: {
          Saving: {
            type: 'Saving',
            title: 'Savings',
            products: []
          }
        },
        ids: ['Saving']
      },
      actions.addCategory({ title: 'Savings', type: 'Saving' })
    );

    const next = reducer(withCategory, actions.deleteCategory('Saving'));

    expect(next.entities['Saving']).toBeUndefined();
    expect(next.ids).not.toContain('Saving');
  });

  it('addProduct appends product to category products list', () => {
    const withCategory = reducer(initialState, actions.addCategory({ title: 'Savings', type: 'Saving' }));

    const next = reducer(
      withCategory,
      actions.addProduct({
        category: 'Saving',
        description: 'Easy access savings',
        title: 'Simple Saver',
        type: 'Simple Saver'
      })
    );

    expect(next.entities['Saving']?.products).toEqual([
      { description: 'Easy access savings', title: 'Simple Saver', type: 'Simple Saver' }
    ]);
  });

  it('deleteProduct removes the matching product by type from category', () => {
    const withCategory = reducer(initialState, actions.addCategory({ title: 'Savings', type: 'Saving' }));

    const withProducts = reducer(
      withCategory,
      actions.addProduct({
        category: 'Saving',
        description: 'A',
        title: 'P1',
        type: 'Simple Saver'
      })
    );

    const withTwo = reducer(
      withProducts,
      actions.addProduct({
        category: 'Saving',
        description: 'B',
        title: 'P2',
        type: 'Cash ISA'
      })
    );

    const next = reducer(withTwo, actions.deleteProduct({ category: 'Saving', product: 'Simple Saver' }));

    expect(next.entities['Saving']?.products).toEqual([{ description: 'B', title: 'P2', type: 'Cash ISA' }]);
  });

  it('selectedCategory sets the selected category value', () => {
    const next = reducer(initialState, actions.selectedCategory('Saving'));
    expect(next.selectedCategory).toBe('Saving');
  });
});
