import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import '../../App.css'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import {Link, Redirect} from 'react-router-dom';
import EventContext from '../../context/EventContext/eventContext';
import AlertContext from '../../context/Alert/alertContext';
const EventItem = ({excursion, user}, props) => {

  const eventContext = useContext(EventContext);
  const alertContext = useContext(AlertContext);
  const [show, setShow] = useState(false);
  const {setAlert} = alertContext;
  const {getSingleEvent, addToWishList} = eventContext;
  const {Company, City, Picture, ShortDescription, Id, isWish, booked} = excursion; 

  useEffect(()=>{
    M.AutoInit();
  },[])
    const getEvent = () =>{
        getSingleEvent({Id});
    }

    /**Upon button click add the event to the wishlist of the user
     * @method
     */
    const addWish = () =>{
      addToWishList(user.Id, Id);
       setAlert("Event successfully added to wishlist", "teal lighten-2");
    }

    const renderToWish = (
      <Link class="waves-effect waves-light btn-small center-align" onClick={addWish} to={`/wishlist/user/${user.Id}`}><i className="material-icons right">send</i>Add to wishlist</Link>
    )

    const renderNotWish = (
      <a class="waves-effect waves-light btn-small center-align disabled">Event booked </a>
    )

  //Template for rendering each event as a card
    return (
      <div>
      <div class="card hoverable z-depth-4">
        <div class="card-image">
          <img src={Picture}/>
            <span class="card-title">{City}</span>
          {!isWish && (<Link class="btn-floating halfway-fab waves-effect waves-light red btn modal-trigger" onClick={getEvent} href="#open-single-event" to={`/single/${Id}`}><i class="material-icons">add</i></Link>)}
        </div>
        <div class="card-content">
    <p>{ShortDescription.length > 30 ? <p className="truncate"> {ShortDescription}</p> : <p>{ShortDescription}</p>}</p>
        </div>
        <div className="card-action">
          {booked ? <a class="waves-effect waves-light btn-small center-align disabled">Event booked </a> : isWish ? <a class="waves-effect waves-light btn-small center-align disabled">Event in wishlist </a> :renderToWish}
        </div>
      </div>
      </div>
    ) 
}

EventItem.propTypes = {

}

export default EventItem
