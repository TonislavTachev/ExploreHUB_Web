import React, {useReducer} from 'react'
import AuthContext from './authcontext';
import Axios from 'axios';
import AuthReducer from './AuthReducer'
import setAuthToken from '../../utils';
import{REGISTER_SUCCESS,
 REGISTER_FAIL,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS, 
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_ERRORS } from '../../types';

const AuthState = props => {

    const initialState = {
       token : localStorage.getItem('token'),
       isAuthenticated:false,
       loggingout:false,
       loading:true,
       error: null,
       user : null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async() =>{
       
        setAuthToken(localStorage.token);

       try {
         const res = await Axios.get('http://localhost:5000/');
         console.log(res.data.data[0]); 
          dispatch({type: USER_LOADED, payload: res.data.data[0]});

       } catch (error) {
        dispatch({type:AUTH_ERROR});
       }
       
    }

    //login the user
    const login = async(formData) =>{
          
     console.log(formData);

       const config = {
           "Content-Type":"application/json"
       }
   
       try {
            const res = await Axios.post("http://localhost:5000/login", formData, config);
            console.log(res.data.token);
            dispatch({type: LOGIN_SUCCESS, payload:res.data.token});

            loadUser();
       } catch (error) {
             dispatch({type:LOGIN_FAIL, payload:error.message});
       }

    }

    const logout = () =>{
        dispatch({type:LOGOUT});
    }

  
    return (
        <AuthContext.Provider value={{
            token : state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            loggingout:state.logginout,
            error:state.error,
            user: state.user,
            login,
            loadUser,
            logout
           
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
