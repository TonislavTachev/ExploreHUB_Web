import React, {useContext} from 'react'
import "../../App.css"
import AlertContext from '../../context/Alert/alertContext';



const Alert = () => {

    const alertContext = useContext(AlertContext);
    const {alert}  = alertContext;

    //Renders an alert given user specific input, e.g:Error, Success, Redirect...
    return (
        
    alert !== null  && (<div className={`card-panel ${alert.type}`}>{alert.message}</div>)
    
    )
}

export default Alert
