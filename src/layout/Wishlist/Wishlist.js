import React, {useState, useContext, useEffect} from 'react'
import Authcontext from '../../context/AuthContext/authcontext';
import Preloader from '../Preloader/Preloader';
import EventContext from '../../context/EventContext/eventContext';
import List from './List';
import {Link} from 'react-router-dom';
import WishlistItem from './WishlistItem';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Alert from '../Alert/Alert';

const Wishlist = () => {
    
    const authcontext = useContext(Authcontext);
    const eventContext = useContext(EventContext);
    const {getWishlist, wishlist, bookEvents, calculateTotal, wishlistTotal} = eventContext;
    const {user, loadUser} = authcontext;

  /**Get the data from the data from the database in order to display it on the page
   * @method
   * 
   */
     useEffect(()=>{
          loadUser();
          if(user!== null){
              setTimeout(()=>{
                getWishlist(user.Id);
              }, 500);
          }
          M.AutoInit();
     },[])

     //if there are no items or there is no user, return a loader
     if(user === null && wishlist === null){
        return <Preloader/>
     }
    
   /**Method to initiate a transaction
    * @method
    */
     const book = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" +dd;
        bookEvents(wishlist, user.Id, today);
     }
    /**Calculates the total for all events
     * @method
     */
     const calcTotal = () =>{
         calculateTotal(wishlist);
     }
 
     //Static HTML code to display the event in the page 
    return (
        <div className='container'>
            <Alert/>
      <div className="row">
               <div className='col m6'>
               <h4>Your wishlist excursions</h4>
                   <List wishlist={wishlist}></List>
                   <Link to="/user" class="waves-effect waves-light btn btn-block"><i class="material-icons left">chevron_left</i>Go back</Link>
               </div>
               <div className='col m6 wishlist-info'>
                    <h5>You currently have {wishlist !== null ? wishlist.length :<p></p>} events in your wishlist</h5>
                    <p>Here you can see your wishlist events, buy and/or discard a particular event</p>
                    <p>All by just one click of a button</p>
                    <ul class="collapsible">
                     <li onClick={calcTotal}>
                      <div class="collapsible-header"><i class="material-icons">attach_money</i>See your total and book</div>
                      <div class="collapsible-body"><span>Your total is $ {wishlistTotal} 
                          <a class="btn tooltipped btn-block book-btn" to="" data-position="bottom" onClick={book} data-tooltip="By pressing this button you are aware of booking all excursions">Book excursions</a></span></div>
                    </li>
                   </ul>
               </div>
            </div>
        </div>
    )
}

export default Wishlist
