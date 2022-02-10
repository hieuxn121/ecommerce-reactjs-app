import { actionTypes } from "./constants"
export const getListProductsStart = (input) => ({
    type: actionTypes.GET_LIST_PRODUCTS_START,
    payload: input
})
export const getListProductsSuccess = (output) => ({
    type: actionTypes.GET_LIST_PRODUCTS_SUCCESS,
    payload: output
})
export const getListProductsFail = () => ({
    type: actionTypes.GET_LIST_PRODUCTS_FAIL
})
export const getListCatStart = () => ({
    type: actionTypes.GET_LIST_CATEGORY_START
})
export const getListCatSuccess = (output) => ({
    type: actionTypes.GET_LIST_CATEGORY_SUCCESS,
    payload: output 
})
export const getListCatFail = () => ({
    type: actionTypes.GET_LIST_CATEGORY_FAIL 
})
export const getDetailProdStart = (input) => ({
    type: actionTypes.GET_DETAIL_PRODUCT_START,
    payload: input
}) 
export const getDetailProdSuccess = (output) => ({
    type: actionTypes.GET_DEATAIL_PRODUCT_SUCCESS,
    payload: output
})
export const getDetailProdFail = () => ({
    type: actionTypes.GET_DETAIL_PRODUCT_FAIL
})
export const getProductSearchedStart = (input) => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_START,
    payload: input
})
export const getProductSearchedSuccess = (output) => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_SUCCESS,
    payload: output
})
export const getProductSearchedFailed = () => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_FAIL
})