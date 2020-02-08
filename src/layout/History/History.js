import React, {useEffect, useContext} from 'react'
import BookingContext from '../../context/BookingTransContext/BkContext';
import Preloader from '../Preloader/Preloader';
import HistoryItem from './HistoryItem';

const History = ({user}) => {

    const bookingContext = useContext(BookingContext);
    const {getHistory, history} = bookingContext;

    /**Gets the user's transaction history upon rendering the webpage
     * @method
     * 
     */
    useEffect(()=>{
       getHistory(user.Id);
    },[]);

    //if there are no events render the loader
    if(history === null){
        return <Preloader/>
    } else {
        //if there are events, render them on the page
    return (
        <ul className='collection hoverable z-depth-4'>
            {history.map((el) => <HistoryItem transHistory={el} key={el.EventID} user={user}/>)}
        </ul>
    )
  }
}

export default History
