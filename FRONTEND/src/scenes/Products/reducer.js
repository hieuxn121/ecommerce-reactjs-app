import { actionTypes } from "./constants";

export const initialState = {
    listProducts: [],
    loading: true,
    limitProds: '',
    categories: [],
    numberProds: 0,
    prodChoosen: {}
}

const calNumberProds = (data) => {
    let value = 0;
    for(let i = 0; i < data.length; i++){
        value ++
    }
    return value;
}
const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_LIST_PRODUCTS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                listProducts: [...action.payload.data],
                loading: false,
                numberProds: calNumberProds(action.payload.data)
            }
        case actionTypes.GET_LIST_CATEGORY_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...action.payload.data],
                loading: false
            }
        case actionTypes.GET_LIST_CATEGORY_FAIL: 
            return {
                ...state,
                loading:false,
                categories: [{name: "No Authorization"}]
            }
        case actionTypes.GET_DETAIL_PRODUCT_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.GET_DEATAIL_PRODUCT_SUCCESS: 
            return {
                ...state,
                loading: false,
                prodChoosen: {...action.payload.data}
            }
        case actionTypes.GET_PRODUCT_SEARCHED_START: 
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_PRODUCT_SEARCHED_SUCCESS:
            return {
                ...state,
                loading: false,
                listProducts: [...action.payload.data]
            }
        default :
            return {
                ...state
            }

    }
}
export default productReducer;