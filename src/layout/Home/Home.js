import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../context/AuthContext/authcontext'
import Preloader from '../Preloader/Preloader';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import EventContext from '../../context/EventContext/eventContext';
import Events from '../Events/Events';
import EventModal from '../Events/EventModal';
import History from '../History/History'
import Alert from '../Alert/Alert';
import HistoryAlert from '../Alert/HistoryAlert';
import Doug from '../Charts/Doug';
import Barchart from '../Charts/Barchart';
import LineChart from '../Charts/LineChart';
import { CSSTransitionGroup } from 'react-transition-group' 


//STATIC HTML to render the Home page

const Home = () => {
    
    const authcontext = useContext(AuthContext);
    const eventContext = useContext(EventContext);
    const {user, isAuthenticated, loading, loadUser} = authcontext;

    useEffect(()=>{
        loadUser();
        M.AutoInit();
    }, []);


    if(user === null){
        return (
            <Preloader/>
        )
    } 

    return (
        <div className="container">
            <Alert/>
            
            <Events user={user}/>
            <div className="row">
                <h4>Statistics</h4>
                <div className="col m6">
                <Doug/>
                </div>
                <div className="col m6">
                 <Barchart/>
                </div>
            </div>
            <div className="row user-history">
            {/* <div className="col m6 ">
                 <LineChart/>
            </div> */}
              <div className="col m12">
                    <HistoryAlert/>
                  <h4 className="text center">Your booked events</h4>
              <History user={user}/>
            </div>
            </div>
        </div>
    )
}

export default Home
