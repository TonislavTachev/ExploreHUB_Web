import React from 'react'

//Static HTML page for displaying the team members
const Team = () => {
    return (
        <div>
             <section className="main-team">
                <h3>ExploreHUB team</h3>
                <h6 className="center-align">The brains behind the operation</h6>
            </section>
            <div className="container">
                <div className='row'>
                   <div className="col m6">
                       <h5>What are we passionate about</h5>
                       <ul class="collapsible passion">
                         <li className='active'>
                    <div class="collapsible-header"><i class="material-icons">code</i>Computing</div>
                    <div class="collapsible-body"><span>Using the newest and hottest technologies in the IT business our goal is to provide our clients with the
                        best possible solution to their problems!</span></div>
                       </li>
                  <li>
                  <div class="collapsible-header"><i class="material-icons">cloud_queue</i>Utilization</div>
                  <div class="collapsible-body"><span>We strive to be up-to-date with the latest trends in the technology branch and bring knowledge to the table! </span></div>
                </li>
               <li>
              <div class="collapsible-header"><i class="material-icons">whatshot</i>Dedication</div>
              <div class="collapsible-body"><span>We turn the spark of each client's idea into a fiery product!</span></div>
             </li>
               </ul>
            </div>
              <div className="col m6">
                 <h5>Technologies used by us</h5>
                 <ul class="collection passion2">
                  <li class="collection-item">
                  <i class="devicon-javascript-plain"></i> Javascript
                  </li>
                  <li class="collection-item">
                  <i class="devicon-java-plain"></i> Java
                  </li>
                  <li class="collection-item">
                  <i class="devicon-nodejs-plain"></i> Node
                  </li>
                  <li className='collection-item'> 
                  <i class="devicon-mongodb-plain"></i> MongoDB
                  </li>
                  <li class="collection-item">
                  <i class="devicon-mysql-plain"></i> Mysql
                  </li>
                  <li className="collection-item">
                  <i class="devicon-heroku-original"></i> Heroku
                  </li>
                </ul>
              </div>
                </div>
            </div>
            <div className="parallax-container team">
                <h4>Meet the team</h4>
                <div class="parallax">
                    <img src="https://images.pexels.com/photos/1102797/pexels-photo-1102797.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/></div>
             </div>
             <div className="row container">
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/KnyFEJS.png"></img>
                       <div className="card-title">
                            <p className="center-align name">Tonislav Tachev</p>
                            <p className="team-position">Project manager/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The driving force of the company, Tonislav specializes in making SPA applications
                              with the help of his favorite technologies <b>React.js, Node.js, Express.js, MongoDB</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/2FNSXli.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Gheorge Mironica</p>
                            <p className="team-position">Software Architect/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The brains behind every project, Gheorge utilizes his sublime architectural skills, not excluding his favorite <b>.NET technologies</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/V1aOzOg.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Hidayat Rzayev</p>
                            <p className="team-position">Backend Developer</p>
                       </div>
                       <div className="card-content members">
                          <h6><b>Information</b></h6>
                          <p>Hidayat specializes in making extraoridary routing configuration for our applications.
                              His favorite technologies include <b>Java, Eclipse JPA, Mysql</b>
                          </p>
                       </div>
                    </div>
                </div>
            </div>
            <div className="row container">
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/KnyFEJS.png"></img>
                       <div className="card-title">
                            <p className="center-align name">Tonislav Tachev</p>
                            <p className="team-position">Project manager/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The driving force of the company, Tonislav specializes in making SPA applications
                              with the help of his favorite technologies <b>React.js, Node.js, Express.js, MongoDB</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/2FNSXli.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Gheorge Mironica</p>
                            <p className="team-position">Software Architect/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The brains behind every project, Gheorge utilizes his sublime architectural skills, not excluding his favorite <b>.NET technologies</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/V1aOzOg.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Hidayat Rzayev</p>
                            <p className="team-position">Backend Developer</p>
                       </div>
                       <div className="card-content members">
                          <h6><b>Information</b></h6>
                          <p>Hidayat specializes in making extraoridary routing configuration for our applications.
                              His favorite technologies include <b>Java, Eclipse JPA, Mysql</b>
                          </p>
                       </div>
                    </div>
                </div>
            </div>
            <div className="row container">
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/KnyFEJS.png"></img>
                       <div className="card-title">
                            <p className="center-align name">Tonislav Tachev</p>
                            <p className="team-position">Project manager/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The driving force of the company, Tonislav specializes in making SPA applications
                              with the help of his favorite technologies <b>React.js, Node.js, Express.js, MongoDB</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/2FNSXli.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Gheorge Mironica</p>
                            <p className="team-position">Software Architect/Full-stack Developer</p>
                       </div>
                       <div className="card-content members">
                       <h6><b>Information</b></h6>
                          <p>The brains behind every project, Gheorge utilizes his sublime architectural skills, not excluding his favorite <b>.NET technologies</b>
                          </p>
                       </div>
                    </div>
                </div>
                <div className="col m4 sm12">
                    <div className="card hoverable">
                       <img className="circle responsive-img member" src="https://i.imgur.com/V1aOzOg.jpg"></img>
                       <div className="card-title">
                            <p className="center-align name">Hidayat Rzayev</p>
                            <p className="team-position">Backend Developer</p>
                       </div>
                       <div className="card-content members">
                          <h6><b>Information</b></h6>
                          <p>Hidayat specializes in making extraoridary routing configuration for our applications.
                              His favorite technologies include <b>Java, Eclipse JPA, Mysql</b>
                          </p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team
