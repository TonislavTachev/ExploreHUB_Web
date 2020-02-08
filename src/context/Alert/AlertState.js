import React, {useReducer} from 'react'
import {SET_ALERT, REMOVE_ALERT, SET_HISTORY_ALERT} from '../../types';
import AlertReducer from './AlertReducer';
import Alertcontext from './alertContext';

const AlertState = props => {

   const initialState = {
      alert:null,
      historyAlert:null
   }
   const [state, dispatch] = useReducer(AlertReducer, initialState);

   const setAlert = (message, type) =>{
    dispatch({type:SET_ALERT, payload: {message, type}});
    setTimeout(() => dispatch({type:REMOVE_ALERT}), 2000);
   }

   const setAlertHistory = (message, type) =>{
      dispatch({type:SET_HISTORY_ALERT, payload: {message, type}});
      setTimeout(() => dispatch({type:REMOVE_ALERT}), 2000);
     }

    return (
        <Alertcontext.Provider value={{
            alert: state.alert,
            historyAlert: state.historyAlert,
            setAlert,
            setAlertHistory
         }} >
            {props.children}
         </Alertcontext.Provider>
    )
}

export default AlertState
