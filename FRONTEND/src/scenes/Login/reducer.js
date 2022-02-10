import {actionTypes} from './constants'

export const initialState = {
    user: {
        email:'',
        username:'',
        password:'$',
        name:{
            firstname:'',
            lastname:''
        },
        address:{
            city:'',
            street:'',
            number:3,
            zipcode:'',
            geolocation:{
                lat:'',
                long:''
            }
        },
        phone:''
    },
    users: [],
    token: "",
    complete: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_NEW_ACC_START: {
            return {
                ...state
            }
        }
        case actionTypes.CREATE_NEW_ACC_SUCCESS: {
            return {
                ...state
            }
        }
        case actionTypes.GET_USER_START: {
            return {
                ...state
            }
        }
        case actionTypes.GET_USER_SUCCESS: {
            return {
                ...state,
                users: [...action.payload.data]
            }
        }
        case actionTypes.LOGIN_START: {
            return {
                ...state
            }
        }
        case actionTypes.LOGIN_SUCCESS: {
            if(action.payload.token !== '' && action.payload.token){
                localStorage.setItem("token", action.payload.token)
            }
            return {
                ...state,
                complete: true
            }
        }
        case actionTypes.LOGIN_FAIL: {
            return {
                ...state
            }
        }
        default:
            return {
                ...state
            }
    }
}
export default loginReducer