import {GET_EVENTS, SET_BOOKED, GET_WISHLIST, SET_ALERT, REMOVE_ALERT, GET_EVENT, SET_EVENT_BOOKED, SET_NOT_BOOKED, SET_ISWISH, NOT_WISH, GET_AVG_COMPANY, GET_USER_BASE, REMOVE_WISH_EVENT, FILTER_EVENTS, ADD_TO_WISH, GET_WISHLIST_TOTAL, GET_MOST_BOOKED} from '../../types';

//reducer which does the actual logic of the event state
export default (state, action) => {
   switch (action.type) {
        case GET_EVENTS:
            //sets the events array to be the one extracted from the database
            //sets the loading to be false
            return {
                ...state,
                events:action.payload,
                loading: false
            }
        case GET_EVENT:
            //sets an event from the one in the database
            //set loading to false
            return {
                ...state,
                event:action.payload,
                loading:false
            }
        case SET_BOOKED:
            //sets isBooked to be true
            return{
                ...state,  
                isBooked: true
            }
        case SET_NOT_BOOKED:
            //set isBooked to false
            return{
                ...state,
                isBooked: false
            }
        case GET_WISHLIST:
            //sets the wishlist to be the one from the database
            //sets loading to false
            return {
                ...state,
                wishlist: action.payload,
                loading:false
            }
        case ADD_TO_WISH:
            //adds an event to the wishlist
            return{
                ...state,
                wishlist: [...state.wishlist, action.payload]
            }
        case SET_ISWISH:
            //sets the isFromWishlist to true
            return{
                ...state,
                isFromWishlist:true
            }
        case NOT_WISH:
            //sets the isFromWishlist to false
            return{
                ...state,
                isFromWishlist: false
            }
            case GET_AVG_COMPANY:
                //sets the doughnut object to house the data for the doughnut barchart from the database
                return{
                    ...state,
                    doughnut: action.payload
                }
            case GET_USER_BASE:
                //sets the userbase to house the data from the database for the userbase
                return {
                    ...state,
                    userbase:action.payload
                }
            case REMOVE_WISH_EVENT:
                //removes a event from the wishlist
                return{
                    ...state,
                    wishlist: state.wishlist.filter(event => event.Id !== action.payload)
                }
            case FILTER_EVENTS:
                //sets the filtered to be the one from the user input
                return{
                    ...state,
                    filtered:state.events.filter(event =>{
                        let newReg = new RegExp(`${action.payload}`, 'g');
                        return event.Company.match(newReg) || event.City.match(newReg)
                    })
                }
            case GET_WISHLIST_TOTAL:
                //sets the total of the events in the wishlist
                return{
                    ...state,
                    wishlistTotal:action.payload
                }
            case GET_MOST_BOOKED:
                //sets the barchart to house the data from the database for the barchart
                return{
                    ...state,
                    barchart:action.payload
                }
        default: 
          return state
   }
}