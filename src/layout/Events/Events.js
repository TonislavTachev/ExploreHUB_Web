import React, {useEffect, useState, useContext} from 'react'
import Eventcontext from '../../context/EventContext/eventContext';
import Preloader from '../Preloader/Preloader';
import EventItem from './EventItem';
import Searchbar from '../SearchBar/Searchbar';
import Pagination from '../Pagination/Pagination';
const Events = ({user}) => {

    //change page
    const paginate = (pageNumber) =>{
        setCurrent(pageNumber);
    }
   
    useEffect(()=>{
            getEvents(user.Id);  
    }, [])

    const eventcontext = useContext(Eventcontext);
    const {getEvents, events, checkBooked,getWishlist, loading, filtered} = eventcontext;
    const [currentPage, setCurrent] = useState(1);
    const [eventsperPage, setEventPerPage] = useState(6);
   
    //get current post
    const indexOfLastPost = currentPage * eventsperPage;
    const indexOfFirstPost = indexOfLastPost - eventsperPage;
    if(filtered !== null){
    var currentPost = filtered.slice(indexOfFirstPost, indexOfLastPost);
    } else if(filtered === null){
        var currentPost = events.slice(indexOfFirstPost, indexOfLastPost);
 
    }
   if(events === null && loading === false){
       return <Preloader/>
   } else {
    return (
        <div>
            <Searchbar/>
        <div style={eventStyle}>
            {currentPost.map((event) =><EventItem excursion={event} key={event.Id} user={user}></EventItem>)}
        </div>
        <div>
        <Pagination eventsperPage={eventsperPage} totalEvents={events.length} paginate={paginate}></Pagination>
       </div>
       </div>
    )
   }
}

const eventStyle = {
    display: 'grid' ,
    gridWrap: 'wrap',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '5px'
}

export default Events
