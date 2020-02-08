import React, {useContext} from 'react'
import "../../App.css"
import AlertContext from '../../context/Alert/alertContext';

const HistoryAlert = () => {

    const alertContext = useContext(AlertContext);
    const {historyAlert}  = alertContext;

    //renders a HistoryAlert when the user chooses to cancel his payment
    return (
        
        historyAlert !== null  && (<div className={`card-panel ${historyAlert.type}`}><h5>{historyAlert.message}</h5></div>)
    
    )
}

export default HistoryAlert
