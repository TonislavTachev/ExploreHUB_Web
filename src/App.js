import React, {useEffect, Fragment, useContext} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './layout/Navbar/Navbar';
import AuthState from './context/AuthContext/AuthState'
import AuthContext from './context/AuthContext/authcontext';
import BookState from './context/BookingTransContext/BookState';
import Login from './layout/login/Login';
import Home from './layout/Home/Home';
import EventState from './context/EventContext/EventState';
import AlertState from './context/Alert/AlertState';
import PrivateRoute from './privateRoute/PrivateRoute';
import SetToken from '../src/utils';
import EventModal from './layout/Events/EventModal';
import SingleEvent from './layout/Events/SingleEvent';
import Wishlist from './layout/Wishlist/Wishlist';
import FrontPage from './layout/FrontPage/FrontPage';
import Team from './layout/Team/Team';



if(localStorage.token){
  SetToken(localStorage.token);
}

function App() {

  useEffect(()=>{
   M.AutoInit();
  },[])


  return (
    <AuthState>
      <EventState>
        <BookState>
        <AlertState>
       <Router>
         <Navbar/>
           <Switch>
             <Route exact path="/" component={FrontPage}></Route>
             <Route exact path="/team" component={Team}></Route>
             <PrivateRoute exact path="/user" component={Home}></PrivateRoute>
             <PrivateRoute exact path="/single/:id" component={SingleEvent}></PrivateRoute>
             <PrivateRoute exact path='/wishlist/user/:id' component={Wishlist}></PrivateRoute>
             <Route exact path="/login" component={Login}></Route>
           </Switch>
       </Router>
       </AlertState>
       </BookState>
       </EventState>
       </AuthState>
  );
}

export default App;
