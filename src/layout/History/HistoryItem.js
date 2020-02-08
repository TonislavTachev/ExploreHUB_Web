import React, {useContext} from 'react'
import AlertContext from '../../context/Alert/alertContext';
import BookingContext from '../../context/BookingTransContext/BkContext';
import '../../App.css';

const HistoryItem = ({transHistory, user}) => {

    const bookingcontext = useContext(BookingContext);
    const alertContext = useContext(AlertContext);
    const {setAlertHistory} = alertContext;
     const {cancel} = bookingcontext;

     /**Cancels the event if it's status shows pending
      * @method
      */
    const cancelBooking = () =>{
        cancel(user.Id, transHistory.EventID);
        //sets an alert notifying the user that his transaction is cancelled 
        setAlertHistory("Transaction cancelled!", "#26a69a teal lighten-1")
    }


    //Template for rendering one history event
    return (
    <li class="collection-item hoverable">
      <img src={transHistory.Logo} style={inlineStyle}/>
       <div class='status'>
           <h6>Status</h6>
          {transHistory.Completed === 0 ? <p>Pending</p> : transHistory.Completed === 3 ? <p>Rejected</p> : <p>Completed</p>}
       </div>
       <div className="paymentMethod">
            <h6>Payment Method</h6>
            {transHistory.PaymentMethod === 2 ? <p>Card</p> : <p>Cash</p>}
       </div>
       <div className="cancelPayment">
            <h6>Cancel Payment</h6>
            {transHistory.Completed === 0 ? <i class="small material-icons cancel" onClick={cancelBooking}>cancel</i> : transHistory.Completed === 1 ? <p>Event booked!</p> : <p>Not allowed</p>}
       </div>
    </li>
    )

}

const inlineStyle ={
    width: "70px;",
    heigth:"70px;",
    paddingRight: "40px;"
}
export default HistoryItem
