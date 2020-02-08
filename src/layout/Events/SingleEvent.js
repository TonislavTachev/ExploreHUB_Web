import React, {useContext, useEffect, useState} from 'react'
import EventContext from '../../context/EventContext/eventContext';
import Preloader from '../Preloader/Preloader';
import {Link} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import AuthContext from '../../context/AuthContext/authcontext';
import EventModal from './EventModal';
import Alert from '../Alert/Alert';
import '../../App.css';
const SingleEvent = ({match}) => {
    
    const eventContext = useContext(EventContext);
    const authcontext = useContext(AuthContext);
    const {loadUser, user} = authcontext;
    const {event, getSingleEvent, getSingle, checkBooked, isBooked} = eventContext;
    const [payment, setPayment] = useState({
        payment: "cash"
   })
   const [open, setOpen] = useState("#modal1");

    useEffect(()=>{
        M.AutoInit();
        loadUser();
    },[])

    const check = (e) =>{
        setPayment({
             payment: e.target.value
        })
   }

   const bookNow = () =>{
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" +dd;


  if(payment.payment === 'card'){
       setOpen("#open-single-event");
  } else if (payment.payment === 'cash'){
       setOpen("#modal1");
  }
   }

    if(event === null && user === null){
        if(event === null){
        return (
        <Preloader/>
        )
        }
    } else {
        
        if(user !== null && event !== null){
            checkBooked(user.Id, event.Id);
        }
    return (
        <div className='container'>
          <Alert/>
            <div className='row'>
                <div className="col m7 mt-2 image-header">
                  <img className="materialboxed" width="100%" src={event === null ? <h4></h4> : event.Picture}></img>
                  {!isBooked ? <blockquote>
                   Disclamer, if no method is chosen the application will automatically choose the cash payment!
                  </blockquote> : <h4></h4> }
                  {isBooked ?  <p className="center-align #e0f2f1 teal lighten-5">You have already booked the event</p>:  <a class="waves-effect waves-light btn modal-trigger" id="book" href="#open-single-event" onClick={bookNow}>Book now</a>}
                 
                </div>
                <div className="col m5">
                  <p>Description of the excurion</p>
                   <p>{event === null ? <h4></h4> : event.LongDescription}</p>
                   <div className="places">
                   <p>Price: {event === null ? <h4></h4> : event.Price}$</p>
                     {event === null ? <h4></h4> : <p> Available places {event.AvailablePlaces}/{event.TotalPlaces}</p>}
                   </div>
                   
               { !isBooked ? <div class='payment-options'>
                       Choose a payment method
                          <p>
                        <label>
                    <input name="group1" value="card" type="radio" onChange={check}  />
                       <span>With card</span>
                         </label>
                         </p>
                         <p>
                    <label>
                     <input name="group1" value="cash" type="radio" onChange={check}/>
                    <span>With cash</span>
                    </label>
                      </p>
                    </div>
                    : <h4></h4>}
                </div>
            </div>
            <EventModal user={user} pay={payment}/>
        </div>
     )
    }
}

export default SingleEvent
