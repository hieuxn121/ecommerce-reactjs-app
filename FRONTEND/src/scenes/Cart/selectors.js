import { createSelector } from "reselect";
import {initialState} from './reducer'

const selectState = (state) => state.cartRoot || initialState

const makeSelectCartProd = () => createSelector(selectState, substate => substate.carts)
const makeSelectLoading = () => createSelector(selectState, substate => substate.loading)
const makeSelectProdInCart = () => createSelector(selectState, substate => substate.prodInCart)
export {
    makeSelectCartProd,
    makeSelectLoading,
    makeSelectProdInCart
}