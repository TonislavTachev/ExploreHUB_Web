import React, {useContext} from 'react'
import "../../App.css"
import {Link} from "react-router-dom"
import AuthContext from '../../context/AuthContext/authcontext';

const Navbar = () => {
    
    const authcontext = useContext(AuthContext);
    const {loading, isAuthenticated, user, logout} = authcontext;
 
    /**Upon button click, logout of the system
     * @method
     */
    const Logout = () =>{
        logout()
    }

    //Render guestLinks
   const guestLinks = (
        <li><Link to='/login'>Login</Link></li>
   )

   //Render authentication links
   const authLink = (
       <div>
<ul id="dropdown1" class="dropdown-content">
<li class="divider"></li>
  {user !== null ? <li><Link to={`/wishlist/user/${user.Id}`}>View wishlist</Link></li> : <h4></h4> }
  <li class="divider"></li>
  <li onClick={Logout}><Link to='/login'>Logout</Link></li>
</ul>
       {user !== null ? <li>Hello, {user.FirstName}</li> : <h4></h4> }
       <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Options<i class="material-icons right">arrow_drop_down</i></a></li>
 
    
       </div>
   )

   //render Navbar
    return (
    <nav>
        <div class="nav-wrapper #00acc1 cyan darken-1">
            <Link to="/user" class="brand-logo"><img className='responsive-img' id="navbar-img" src='https://i.imgur.com/dZbEbWZ.png'></img></Link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              {isAuthenticated ? authLink : guestLinks}
           </ul>
       </div>
    </nav>
    )
}

export default Navbar;
