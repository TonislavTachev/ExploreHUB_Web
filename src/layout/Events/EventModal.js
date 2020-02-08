import React, {useEffect, useContext, useState} from 'react'
import EventContext from '../../context/EventContext/eventContext';
import AlertContext from '../../context/Alert/alertContext';
import Preloader from '../Preloader/Preloader';
import '../../App.css'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import {Link} from "react-router-dom"
const EventModal = ({user, pay}) => {
     const eventContext = useContext(EventContext);
     const alertContext = useContext(AlertContext);
     const {setAlert} = alertContext;
     const {loading, checkBooked, isBooked, event, book, removeFromWish} = eventContext;
     const [payment, setPayment] = useState({
          payment: "card"
     })
      const check = (e) =>{
           setPayment({
                payment: e.target.value
           })
      }
      /**Creates a transaction for the specific event if the user chose to pay for it with cash
       * @method
       */
      const bookEventWithCash = () =>{
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = yyyy + "-" + mm + "-" +dd;
        //check to see if the event is already in the wishlist
        //if it is, book it and remove it
        //if it's not, book it either way and do nothing
        removeFromWish(user.Id, event.Id);
        //TODO make the if-else stament
        book(user.Id, today, 0, event.Id, 1);
        setAlert("Event successfully booked","teal lighten-2");
     }

     /**Creates a transaction for the specific event if the user chose to pay for it with card
      * @method
      */
     const bookEventWithCard = () =>{
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" +dd;

//check to see if the event is already in the wishlist
        //if it is, book it and remove it
        //if it's not, book it either way and do nothing
        removeFromWish(user.Id, event.Id);
        //TODO make the if-else stament
        book(user.Id, today, 0, event.Id, 1);
 }

    //renders the payment if the user chose cash
     const renderCashPayment =  (
         <div className="modal-content">
         <h3 className='center-align'>You have chosen to pay with cash</h3>
         <p>Given this please bring with you the money for the excursion to the international office</p>
         <p>Please confirm so we reserve you your place!</p>
         <Link to={`/single/${user.Id}`} class="waves-effect waves-light btn modal-close " onClick={bookEventWithCash}>Confirm</Link>
         </div>
       )

   //renders the payment if the user chose card
     const renderCard = (
        <div class="modal-content">
          <h3>You have chosen to pay with card</h3>
          <h3>Please specify the card details below</h3>
          <div className='row'>
              <div class="input-field col s6">
                <input value="XXXXXX-XXXXX-XXXXX-XXXX" id="first_name2" type="text" class="validate"/>
                <label class="active" for="first_name2">Card Number</label>
             </div>
          </div>
          <div className='row'>
              <div class="input-field col s6">
                <input value="XX/XXX" id="first_name2" type="text" class="validate"/>
                <label class="active" for="first_name2">Enter your CVV number</label>
             </div>
        </div>
{event !== null && event.AvailablePlaces === 0 ? <button class='btn waves-effect waves-light disabled'>Sold out</button> : <Link to={`/single/${user.Id}`} class='btn waves-effect waves-light mt-2 modal-close' onClick={bookEventWithCard}>Book now</Link>}  
     </div>
       )

    return (
        <div id="open-single-event" class="modal">  
           {pay.payment === "cash" ? renderCashPayment : <h4></h4>}
           {pay.payment === 'card' ? renderCard : <h4></h4>}
        <div class="modal-footer">
             <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    )
}

export default EventModal
