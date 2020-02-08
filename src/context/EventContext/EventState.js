import React,{useReducer} from 'react'
import EventReducer from './EventReducer';
import axios from 'axios';
import EventContext from './eventContext';
import {GET_EVENTS, GET_WISHLIST,GET_EVENT,GET_AVG_COMPANY, GET_USER_BASE,GET_MOST_BOOKED,SET_NOT_BOOKED, SET_BOOKED, SET_ALERT, REMOVE_WISH_EVENT, BOOK_EVENT, FILTER_EVENTS, ADD_TO_WISH, GET_WISHLIST_TOTAL} from '../../types';

const EventState = props => {

    /**
     * @param {Array} events Array of objects which is holding all events
     * @param {Object} doughnut object which is going to hold the data for the doughnut chart
     * @param {Object} barchart object which is going to hold the data for the barchart 
     * @param {Object} userbase object which is going to hold the data for the histogram
     * @param {Boolean} loading boolean value used to determine if all data is loaded in the page
     * @param {Object} filtered object which is going to hold the filtered event 
     * @param {Boolean} isFromWishlist boolean value to determine if an event is from a particular wishlist
     * @param {Array} wishlist array of objects which is holding desired events of a user
     * @param {Object} wishlistTotal object that is holding the number of all events in the wishlist
     * @param {Array} booked array of object which is going to hold the events that the user booked
     * @param {Object} event object which is going to represent one event
     * @param {Object} error object which is going to hold potential errors
     * @param {Boolean} isBooked boolean value which is going to check if an event is booked
     */
  
    const initialState = {
        events: [],
        doughnut: null,
        barchart: null,
        userbase: null,
        loading: true,
        filtered: null,
        isFromWishlist: false,
        wishlist: [],
        wishlistTotal:null,
        booked: [],
        event: null,
        error:null,
        isBooked: false
    }

    const [state, dispatch] = useReducer(EventReducer, initialState);
    

    /**Method which gets all the events from the database and checks if the user has some booked or in his wishlist
     * @method
     * @param {Integer} user_id Integer value representing the ID of the user
     * @async background operation
     */
    const getEvents = async(user_id) =>{
        // try to get the events 
        try{
            const data = await axios.get("http://localhost:5000/locations");

             var events = data.data.data;

             //map through the events 
             events.map(async(el) => {
               //check if an event is from the wishlist of the particular user
                 let isSelected = await checkWish(user_id, el.Id);
                 if(isSelected){
                     el.isWish = true;
                 } else if(!isSelected){
                     el.isWish = false;
                 }
                 //check if an event is booked by a particular user
                 let isBooked = await checkBooked(user_id, el.Id);
                 if(isBooked){
                     el.booked = true;
                 } else if(!isBooked){
                     el.booked = false;
                 }
             })
          
             //need to wait half a second before loading the events, because we're doing
             //two database calls inside one function
             console.log(events);   
             setTimeout(()=>{
                dispatch({type:GET_EVENTS, payload:events});
             }, 800);

        } catch{

        }

    }

    /**Get an event based on user input (searchbar)
     * @method
     * @param {String} eventName string value representing the event the user searched for
     */
    const filterEvents = (eventName) =>{
      dispatch({type:FILTER_EVENTS, payload:eventName});
    }

    /**Method that gets a single event 
     * @method
     * @param {Integer} eventId integer value which represents the ID of an event
     */
    const getSingleEvent = async(eventId) =>{
       const data = await axios.get(`http://localhost:5000/${eventId.Id}`);
       console.log(data.data.data[0]);
       //sent the information to the reducer
       dispatch({type:GET_EVENT, payload:data.data.data[0]});
    }

    const getSingle = async(id) =>{
        console.log(id);
    }

    /**Method which creates a transaction
     * @method
     * @param {Integer} studentID user ID
     * @param {String} date string representation of the date
     * @param {Integer} completed sets the status of the transaction
     * @param {Integer} eventId event ID
     * @param {Integer} paymentMethod sets the payment method
     */
    const book = async(studentID, date, completed, eventId, paymentMethod) =>{
      
       const book = await axios.post(`http://localhost:5000/transaction/${studentID}/${date}/${completed}/${eventId}/${paymentMethod}`);
    }

    /**Check whether an event has been booked
     * @method
     * @param {Integer} user_id user ID
     * @param {Integer} event_id event ID
     */
    const checkBooked = async(user_id, event_id)=>{
         const data = await axios.get(`http://localhost:5000/check/${user_id}/${event_id}`);
         if(data.data.data.length !== 0){
            setBooked();
            return true;
         } else {
             unSetBooked();
             return false;
         }
    }

    /**Books events and removes them from the wishlist
     * @method
     * @param {Array} wishlist array of wishlist events
     * @param {Integer} user_id user ID
     * @param {String} date string representation of the date
     */
    const bookEvents = async(wishlist, user_id, date) =>{
       wishlist.map(async(event) =>{
         await removeFromWishUser(user_id, event.Id);
         await book(user_id, date, 0, event.Id,2);
       })
    }

    /**Gets the wishlist for a particular user
     * @method
     * @param {Integer} user_id user ID
     */
    const getWishlist = async(user_id) =>{

        try {
            const data = await axios.get(`http://localhost:5000/wishlist/${user_id}`);
            var wishlist = data.data.data;
            
            setTimeout(()=>{
                dispatch({type:GET_WISHLIST, payload:wishlist});   
            },500);
        } catch (error) {
            
        }        
    }

    /**Calculates the total cost of the events
     * @method
     * @param {Array} wishlist array holding the events in the wishlist of the user
     */
    const calculateTotal = (wishlist) =>{
   
        //loops the events, gets their price and calculates the total
       var amount = 0;
       for(let i =0; i < wishlist.length; i++){
           amount += wishlist[i].Price;
       }

       dispatch({type:GET_WISHLIST_TOTAL, payload: amount});
    }

    /**Check if an event is in the wishlist of a user
     * @method
     * @param {Integer} user_id 
     * @param {Integer} event_id 
     */
    const checkWish = async(user_id, event_id) =>{
         console.log(user_id, event_id);
        try {
            const data = await axios.get(`http://localhost:5000/wishlist/${user_id}/${event_id}`);
            if(data.data.data.length !== 0){
                return true;
            } else if(data.data.data.length === 0) {
                return false;
            }
        } catch (error) {
            
        }
    }

    /**Adds a particular event in the wishlist of the particular user
     * @method
     * @param {Integer} user_id user ID 
     * @param {Integer} event_id event ID
     */
    const addToWishList = async(user_id, event_id)=>{
          try {
            const event =  await axios.post(`http://localhost:5000/wishlist/${user_id}/${event_id}`);
              console.log(event);
            //   dispatch({type:ADD_TO_WISH, payload:event});
          } catch(error){

          }
    }

    /**Removes an event from the wishlist of the user
     * @method
     * @param {Integer} user_id user ID 
     * @param {Integer} event_id event ID
     */
    const removeFromWish = async(user_id, event_id) =>{
        try {
            const data = await axios.get(`http://localhost:5000/wishlist/${user_id}/${event_id}`);
            if(data.data.data.length !== 0){
                console.log("Event is in wishlist");
                axios.post(`http://localhost:5000/remove/wishlist/${user_id}/${event_id}`);
            }
        } catch (error) {
            
        }
    }

    /**Removes the event from the user's wishlist
     * @method
     * @param {Integer} user_id user ID 
     * @param {Integer} event_id event ID
     */
    const removeFromWishUser = async(user_id, event_id) =>{
        try {
            axios.post(`http://localhost:5000/remove/wishlist/${user_id}/${event_id}`);
            dispatch({type:REMOVE_WISH_EVENT, payload:event_id});
        } catch (error) {
            
        }
    }

    /**Sets a boolean value showing that the event has been booked
     * @method
     */
    const setBooked = () =>{
        dispatch({type: SET_BOOKED});
    }

    /**Sets a boolean value showing the the event hasn't been booked
     * @method
     */
    const unSetBooked = () =>{
        dispatch({type: SET_NOT_BOOKED});
    }

    /**Gets the average events hosted by company
     * @method
     */
    const getAvgCompany = async() =>{
          try {
            const data =  await axios.get('http://localhost:5000/stats/avgcompany');
            let events = data.data.data;
           
            //map through the data, remove duplicates and save in array
            const unique = Array.from(new Set((events.map(ev => ev.Company))));
            var countArr=[];
        
            //get number of occurances for each value in the database
            for(var i = 0; i < unique.length; i++){
                var count = 0;
                for(var j =0; j < events.length; j++){
                    if(unique[i] == events[j].Company){
                        count++;
                    } 
                }
                countArr.push(count);
            }
            const obj = {
                labels: unique,
                data: countArr
            }

            dispatch({type:GET_AVG_COMPANY, payload: obj});
       
          } catch (error) {
              
          }
    }

    /**Gets the most booked events by company
     * @method
     */
    const getMostBookedEvents = async() =>{
            const data = await axios.get("http://localhost:5000/stats/avgevents");
            let events = data.data.data;
            const unique = Array.from(new Set((events.map(ev => ev.Company))));
            
            var countArr = [];
            for(var i = 0; i < unique.length; i++){
                var count = 0;
                for(var j =0; j < events.length; j++){
                    if(unique[i] == events[j].Company){
                        count++;
                    } 
                }
                countArr.push(count);
            }

          const obj = {
              labels:unique,
              data: countArr
          }

          dispatch({type:GET_MOST_BOOKED, payload:obj});
    }

    /**Gets the userbase of the application
     * @method
     */
    const getUserBase = async() =>{
        try {
            const data = await axios.get('http://localhost:5000/stats/users');
            const userbase = data.data.data[0].userbase;
            var count = userbase;
            var array = [];
            while(count > 0){
                var num = count - 20;
                array.push(num);
                count-=20;
            }
            array.filter((el)=>{
                if(el < 0){
                    array.pop(el);
                }
            })
            array = array.reverse();
            array.push(userbase);
            dispatch({type:GET_USER_BASE, payload: array});
        }catch(error){

        }
    }

    return (
       <EventContext.Provider value={{
           events: state.events,
           event: state.event,
           doughnut: state.doughnut,
           barchart: state.barchart,
           userbase:state.userbase,
           loading: state.loading,
           filtered:state.filtered,
           wishlist: state.wishlist,
           wishlistTotal: state.wishlistTotal,
           isFromWishlist: state.isFromWishlist,
           isBooked: state.isBooked,
           booked: state.booked,
           getEvents,
           getSingleEvent,
           book,
           checkBooked,
           getSingle,
           getWishlist,
           addToWishList,
           removeFromWish,
           removeFromWishUser,
           bookEvents,
           getAvgCompany,
           getUserBase,
           getMostBookedEvents,
           filterEvents,
           calculateTotal
       }}>
         {props.children}
       </EventContext.Provider>
    )
}

export default EventState
