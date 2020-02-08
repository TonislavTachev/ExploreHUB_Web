import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/AuthContext/authcontext';
const Login = props => {

   const authcontext = useContext(AuthContext);
   const {login, isAuthenticated} = authcontext;

   const [user, setUser] = useState({
       email: '',
       password: ''
   });

   useEffect(()=>{
       if(isAuthenticated){
        props.history.push('/user');
       }
   })


  const {email, password} = user;

  const onChange = (e) =>{
     setUser({...user, [e.target.name]:e.target.value});
   }

   /**Method which takes the user's input and forwards it to DB
    * @param {e} e - lambda expression for invoking user input
    * @method
    */
  const onSubmit = (e) => {
      e.preventDefault();
      //check if the email is valid
      const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(emailReg.test(user.email)){
          console.log("Email is valid");
          //check if it's a hochschule email via a regular expression
          const hsMail = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(hs-ulm)\.de$/
          if(hsMail.test(user.email)){
              console.log("Valid hs mail");
              //invoke login user method, which takes the user object 
              login(user);
              //set the fields to be empty again
              setUser({
                  email: '',
                  password: ''
              })
          }
      }
   }

    return (
    <div className='container'>
        <div className='login-content'>
            <div className='row'>
                <div className='col m2'></div>
                <div className="col m8">
                    <h5 className=''>Login</h5>
                <div class="row">
            <form class="col s12" onSubmit={onSubmit}>
         <div class="row">
           <div class="input-field col s12">
           <input type="text" name="email" value={email} onChange={onChange} />
           <label for="email">Email</label>
         </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
          <input id="password" type="password" name='password' value={password} onChange={onChange} class="validate"/>
           <label for="password">Password</label>
        </div>
       </div>
       <button class="btn waves-effect waves-light  #00acc1 cyan darken-1" type="submit" name="action">Submit</button>
         </form>
        </div>
  </div> 
<div className='col m2'></div>
</div>
           </div>
        </div>
    )
}

export default Login
