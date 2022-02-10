import { takeLatest, call, race, put } from "@redux-saga/core/effects";
import { actionTypes } from "./constants";
import {
    getCartProdSuccess,
    getCartProdFail
}
from './actions'
import service from './services'
export default function* watchProductAction(){
    yield takeLatest(
        actionTypes.GET_CART_PROD_START,
        getCartProd
    )
}

function* getCartProd(){
    try {
        const {output} = yield race({
            output: call(service.getCart)
        })
        if(output){
            yield put(getCartProdSuccess(output))
        }
        else{
            yield put(getCartProdFail())
        }
    } catch (error) {
        yield put(getCartProdFail())
    }
}