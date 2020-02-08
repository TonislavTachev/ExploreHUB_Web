import React, {useState, useEffect, useContext} from 'react'
import EventContext from '../../context/EventContext/eventContext';

const Searchbar = () => {
    const eventContext = useContext(EventContext);
    const {filterEvents, filtered} = eventContext;
    const [search, setSearch] = useState('');

    useEffect(()=>{
        if(filtered === null){
            setSearch('');
        }
    },[]); 

    /**
     * 
     * @param {Placeholder} e Similar to lambda expressions, gets the user input 
     */
    const onChange = (e) =>{
        filterEvents(e.target.value);
    }

   //static HTML page to render the searchbar
    return (
 <nav className="search-bar">
    <div class="nav-wrapper #00acc1 cyan darken-1">
      <form>
        <div class="input-field">
          <input id="search" onChange={onChange} placeholder="Search for an event" type="search"/>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
    )
}

export default Searchbar
