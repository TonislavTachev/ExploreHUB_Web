import React, {useEffect,useContext} from 'react'
import "../../App.css";
import AuthContext from '../../context/AuthContext/authcontext';
import EventContext from '../../context/EventContext/eventContext';
import Preloader from '../Preloader/Preloader';

const WishlistItem = ({excursion}) => {

    const styleImg = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(${excursion.Picture})`
        
    }
    
    const authcontext = useContext(AuthContext);
    const {user, loadUser} = authcontext;
    const eventContext = useContext(EventContext);
    const {removeFromWishUser} = eventContext;
   /**
    * Loads the user in upon opening of the page
    */
    useEffect(()=>{
        loadUser();
    },[])

    if(user === null){
      return <Preloader/>
    }

 /**Removes event from wishlist
  * @method
  * 
  */
    const remove = () =>{
      removeFromWishUser(user.Id, excursion.Id);
    }

    return (
       
      <div className="event-card" style={styleImg}>
            <div class="general-inf">
               <h3>{excursion.Company}</h3>
            </div>
           <div class="delete">
              <i class="far fa-times-circle" onClick={remove} ></i>
           </div>
      </div>
       
    )
}

export default WishlistItem
