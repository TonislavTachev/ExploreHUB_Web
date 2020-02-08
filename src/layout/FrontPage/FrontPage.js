import React, {useEffect} from 'react'
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import {Link} from "react-router-dom";
const FrontPage = () => {
   
    useEffect(()=>{
        M.AutoInit();
    }, [])

    //STATIC HTML page showing the home page of the application

    return (
    <div>
            <section className="main">
                <h3>ExploreHUB</h3>
                <h6 className="center-align">Experience tranquility</h6>
            </section>
    
           <div className='container'>
               <div className="row general">
                    <div className="col m6">
                        <h4 className="center-align">Who are we?</h4>
                        <p >We're a group of enthusiastic programmers, with the sole purpose of making booking an easy and fun process</p>
                        <h4 className="center-align">Our partners</h4>
                        <p >We have partnered with THU Ulm in order to give it's students the best excursion experience possible</p>
                    </div>
                    <div className="col m6">
                        <img className="responsive-img thu" src="https://www.uni-ulm.de/fileadmin/website_uni_ulm/io/0_LOGOS/THU_Logo_lang.jpg"></img>
                    </div>
               </div>
           </div>
           <div class="parallax-container">
              <div class="parallax"><img src="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=840"/>
              </div>
              <h4 className="center-align"></h4>
          </div>
          <div class="section white">
         <div class="row container">
                 <h2 class="header">Our products</h2>
                 <p class="grey-text text-darken-3 lighten-3">ExploreHUB gives students the choice of choosing either our desktop application or our web one.</p>
                 <div className="col m6">
                   <div class="carousel carousel-slider center">
                           <div class="carousel-fixed-item center">
                             <a class="btn waves-effect white grey-text darken-text-2">Back to first</a>
                           </div>
                          <div class="carousel-item white black-text" href="#one!">
                          <h2>View</h2>
                            <p class="white-text">This is your first panel</p>
                           <img src="http://i.imgur.com/7VJ8Cvb.png" className="responsive-img"></img>
                           </div>
                           <div class="carousel-item white black-text" href="#two!">
                           <h2>Read</h2>
                             <p class="white-text">This is your second panel</p>
                           <img src="https://i.imgur.com/ePodsPe.png" className="responsive-img"></img>
                          </div>
                           <div class="carousel-item white black-text" href="#three!">
                           <h2>Book</h2>
                            <p class="white-text">This is your third panel</p>
                            <img src="https://i.imgur.com/wxeXw7Q.png" className="responsive-img"></img>
                          </div>
                    </div>
              </div>

              <div className="col m6">
                   <div class="carousel carousel-slider center caro-2">
                           <div class="carousel-fixed-item center">
                             <a class="btn waves-effect white grey-text darken-text-2">Back to first</a>
                           </div>
                          <div class="carousel-item white black-text" href="#one!">
                          <h2>View</h2>
                            <p class="white-text">This is your first panel</p>
                           <img src="https://i.imgur.com/gYJkaXr.png" className="responsive-img"></img>
                           </div>
                           <div class="carousel-item white black-text" href="#two!">
                           <h2>Explore</h2>
                             <p class="white-text">This is your second panel</p>
                           <img src="https://i.imgur.com/ovABEQp.png" className="responsive-img"></img>
                          </div>
                    </div>
              </div>
         </div>
    </div>
    <div class="parallax-container">
              <div class="parallax"><img src="https://www.augenlaserzentrum-neu-ulm.de/assets/img/fehlsichtigkeit/Augen-lasern-Neu-Ulm.jpg?m=1529936026"/>
              </div>
              <h4 className="center-align"></h4>
    </div>
    <div className="section white">
       <div className="row">
          <div className="col m6 about-text">
            <h4 className="center-align">Want to know more about our team ?</h4>
            <p className="center-align">Find out below</p>
            <Link to="/team" class="btn waves-effect about #ff9800 orange" type="submit" name="action">About us
                <i class="material-icons right">group</i>
            </Link>
          </div>
           <div className="col m6">
                <img src="https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="responsive-img laptop"></img>
           </div>
       </div>
    </div>
    <footer class="page-footer">
        <h4 className="center-align">ExploreHUB </h4>
          <div class="footer-copyright">
            <div class="container">
            © 2019 All rights reserved
            </div>
          </div>
        </footer>
    </div>
    )
}

export default FrontPage
