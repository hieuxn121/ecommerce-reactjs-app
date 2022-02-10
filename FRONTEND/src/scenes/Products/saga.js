import { takeLatest, call, race, put } from "@redux-saga/core/effects";
import { actionTypes } from "./constants";
import {
    getListProductsFail,
    getListProductsSuccess,
    getListCatFail,
    getListCatSuccess,
    getDetailProdSuccess,
    getDetailProdFail,
    getProductSearchedSuccess,
    getProductSearchedFailed
}
from './actions'
import service from './services'
export default function* watchProductAction(){
    yield takeLatest(
        actionTypes.GET_LIST_PRODUCTS_START,
        getListProducts
    )
    yield takeLatest(
        actionTypes.GET_LIST_CATEGORY_START,
        getListCate
    )
    yield takeLatest(
        actionTypes.GET_DETAIL_PRODUCT_START,
        getDetailProd
    )
    yield takeLatest(
        actionTypes.GET_PRODUCT_SEARCHED_START,
        getListProducts
    )
}

function* getListProducts(input){
    try {
        const {output} = yield race({
            output: call(service.getListProducts, input.payload)
        })
        if(output){
            yield put(getListProductsSuccess(output))
        }
        else{
            yield put(getListProductsFail())
        }
    } catch (error) {
        yield put(getListProductsFail())
    }
}
function* getListCate(){
    try {
        const {output} = yield race({
            output: call(service.getListCates)
        })
        if(output){
            yield put(getListCatSuccess(output))
        }
        else{
            yield put(getListCatFail())
        }
    } catch (error) {
        yield put(getListCatFail())
    }
}
function* getDetailProd(input){
    try {
        const {output} = yield race({
            output: call(service.getDetailProd, input.payload)
        })
        if(output){
            yield put(getDetailProdSuccess(output))
        }
        else{
            yield put(getDetailProdFail())
        }
    } catch (error) {
        yield put(getDetailProdFail())
    }
}
function* getProductSearched(input){
    try {
        const {output} = yield race({
            output: call(service.getProdSearched, input.payload)
        })
        if(output){
            yield put(getProductSearchedSuccess(output))
        }
        else{
            yield put(getProductSearchedFailed())
        }
    } catch (error) {
        yield put(getProductSearchedFailed())
    }
}