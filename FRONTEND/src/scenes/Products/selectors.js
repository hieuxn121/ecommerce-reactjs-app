import {createSelector} from 'reselect'
import { initialState } from './reducer'

const selectState = (state) => state.productsRoot || initialState

const makeSelectListProducts = () => createSelector(selectState, substate => substate.listProducts)
const makeSelectLoading = () => createSelector(selectState, substate => substate.loading);
const makeSelectorLimitProds = () => createSelector(selectState, substate => substate.limitProds)
const makeSelectCategories = () => createSelector(selectState, substate => substate.categories)
const makeSelectNumberProds = () => createSelector(selectState, substate => substate.numberProds)
const makeSelectProdChoosen = () => createSelector(selectState, substate => substate.prodChoosen)
export {
    makeSelectListProducts,
    makeSelectLoading,
    makeSelectorLimitProds,
    makeSelectCategories,
    makeSelectNumberProds,
    makeSelectProdChoosen
}