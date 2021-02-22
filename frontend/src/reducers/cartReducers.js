import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_BILLING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_PRICE,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (state = {}, action) => {
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
        cartItems: state.cartItems.filter((cartItem) => cartItem.product !== payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case CART_SAVE_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: payload,
      };
    case CART_SAVE_PRICE:
      return {
        ...state,
        price: payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentDetails: {
          option: 'card',
          ...payload,
        },
      };
    default:
      return state;
  }
};
