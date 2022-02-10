import {actionTypes} from './constants'

export const initialState = {
    carts: [],
    prodInCart: [],
    loading: true
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_CART_PROD_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_CART_PROD_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.GET_CART_PROD_FAIL:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
export default cartReducer;