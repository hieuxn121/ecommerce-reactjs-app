import {actionTypes} from './constants'
export const getCartProdStart = () => ({
    type: actionTypes.GET_CART_PROD_START
})
export const getCartProdSuccess = (output) => ({
    type: actionTypes.GET_CART_PROD_SUCCESS,
    payload: output
})
export const getCartProdFail = () => ({
    type: actionTypes.GET_CART_PROD_FAIL
})
