import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== payload,
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    default:
      return state;
  }
};
