import{REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS } from '../../types';


export default (state,action)=>{
    switch (action.type) {
        default:
            return state
        case LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                isAuthenticated: true,
                token: localStorage.setItem('token', action.payload),
                loading:false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                user: action.payload,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated:false,
                loading:true,
                user: null,
            }
    }
}