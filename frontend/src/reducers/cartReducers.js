import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const newCartItem = payload;
      const matchedItem = state.cartItems.find(
        (cartItem) => cartItem.product === newCartItem.product,
      );

      if (matchedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === matchedItem.product ? newCartItem : cartItem,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
        };
      }
      return {};
    case CART_REMOVE_ITEM:
      return {};
    default:
      return state;
  }
};
