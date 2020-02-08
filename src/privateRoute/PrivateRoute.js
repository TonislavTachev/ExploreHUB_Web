import React, {useState, useContext, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../context/AuthContext/authcontext';

/**
 * @async
 * @method
 * @param {React Component} component - Component we want only auth users to enter
 * @returns {Component} Component - if the user is authenticated  
 */

const PrivateRoute =({component: Component, ...rest}) => {
    
    const authcontext = useContext(AuthContext);
    const {isAuthenticated, loading, loadUser} = authcontext;
    const [isLoaded, setLoaded] = useState(true);

    useEffect(() =>{
        setLoaded(false);
    })

    return (
        <Route {...rest} render={props => isAuthenticated === false && isLoaded === false ? (
            <Redirect to ='/login' />
        ) : (<Component {...rest}/>)}>
            
        </Route>
    )
}

export default PrivateRoute
