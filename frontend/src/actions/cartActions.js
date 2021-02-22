import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_PRICE,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BILLING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: res.data._id,
      name: res.data.name,
      image: res.data.image,
      price: res.data.price,
      countInStock: res.data.countInStock,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formData,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(formData));
};

export const saveBillingAddress = (formData) => (dispatch) => {
  dispatch({
    type: CART_SAVE_BILLING_ADDRESS,
    payload: formData,
  });

  localStorage.setItem('billingAddress', JSON.stringify(formData));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  });
};

export const calculatePrices = (cartItems) => async (dispatch) => {
  const price = {};

  price.items = Number(
    cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2),
  );
  price.shipping = Number((price.items > 100 ? 0 : 10).toFixed(2));
  price.tax = Number((0.1 * price.items).toFixed(2));
  price.total = Number((price.items + price.shipping + price.tax).toFixed(2));

  dispatch({
    type: CART_SAVE_PRICE,
    payload: price,
  });
  localStorage.setItem('cartPrice', JSON.stringify(price));
};

export const getBillingDetails = ({
  firstName,
  lastName,
  line1,
  line2,
  city,
  state,
  postalCode,
}) => {
  return {
    name: firstName + ' ' + lastName,
    address: {
      line1,
      line2,
      city,
      state,
      postal_code: postalCode,
      country: 'US',
    },
  };
};
