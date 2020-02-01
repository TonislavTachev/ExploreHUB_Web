const express = require('express');
const app = express();
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const config = require('config');
const cors = require('cors');
const {check, validationResult } = require('express-validator');
const PORT = process.env.PORT || 5000;

//init database
const db = connectDB();

app.use(cors());
app.use(express.json({extended: false}));

//application middlaware for authentication
function auth(req,res,next){

    //Since this is a middlaware function, it's put between the request and response of each route
    //meaning that one could extract the req.body from the request, validate it and then continue to the response
    //or drop the request
   const token = req.header('x-auth-token');
   
   //check if the token exists
   if(!token){
       return res.status(401).json({msg:'No token, authorization denied'});
   }

   try{
       const decode = jwt.verify(token,config.get('jwtSecret'));
       req.user = decode.payload.user.id;
       next();
   }catch(error){
       res.status(401).json({msg:"Token is invalid"});
   }

}
//@route post
//@desc create a transactions
//@private
app.post("/transaction/:student_id/:date/:completed/:eventid/:payment", auth, (req,res)=>{
    let sql = "INSERT INTO transactions(StudentID, Date, Completed, EventID, PaymentMethod) " +
   ` VALUES(${req.params.student_id}, ${JSON.stringify(req.params.date)}, ${req.params.completed}, ${req.params.eventid}, ${req.params.payment});`
   db.query(sql, (err,result) =>{
    if(err){
        console.log(err.message);
    }
    res.status(200);
})
})

//@route post
//@desc create an invoice for transactions
//@private
app.post("/invoice/:student_id/:date/:amount/:event_name/:event_company", auth, (req,res)=>{
    
})


//@route get 
//@desc gets all excursions available
//@access public
app.get("/locations", (req,res)=>{
    let sql = "SELECT Id, Date, Company, Price, TotalPlaces, AvailablePlaces, ShortDescription, LongDescription, City, Picture FROM event "
    + " JOIN location ON event.Id = location.EventID JOIN pictures on event.Id = pictures.EventID"
    db.query(sql, (err,result) =>{
        if(err){
            console.log(err.message);
        }

        res.status(200).json({
            data: result,
            count: result.length
        })
    })
})

//@route get /:id
//@desc gets a specific excursion
//@access private 
app.get('/:id', auth, (req,res)=>{
   
    console.log(req.user);

    let sql = "SELECT Id, Date, Company, Price, TotalPlaces, AvailablePlaces, ShortDescription, LongDescription, City, Picture FROM event "
    + `JOIN location ON event.Id = location.EventID JOIN pictures on event.Id = pictures.EventID where event.Id = ${req.params.id}`
    db.query(sql, (err,result) =>{
        if(err){
            console.log(err.message);
        }

        res.status(200).json({
            data: result
        })
    })
})

//@route post
//@desc Update the available free spaces in each event
app.post('/event/:event_id/:newplaces', auth, (req,res) =>{
    let sql = `UPDATE event SET AvailablePlaces = ${req.params.newplaces} 
    WHERE Id = ${req.params.event_id} `;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(200);
        }
    })
})

//@route get 
//@desc check if the event has been previously booked by the user
//@access private

app.get(`/check/:student_id/:event_id`, auth, (req,res) =>{
    let sql = `SELECT * FROM transactions where 
    transactions.StudentID =${req.params.student_id} AND 
    transactions.EventID = ${req.params.event_id} AND (transactions.Completed = 0 || transactions.Completed = 1) LIMIT 1`

    db.query(sql, (error, result)=>{
        if(error){
            res.status(404).json({mgs:"No event found"});
        } else {
            res.status(200).json({
                data: result
            })
        }
    })
})


//@route get /bookingTransactions
//@desc gets the transaction history of the user
//@access private
app.get('/history/transactions/:student_id', auth, (req,res)=>{
    const sql = "SELECT Completed,transactions.EventID,PaymentMethod, Company, Logo from transactions "
    + " JOIN event ON transactions.EventID = event.Id " + " JOIN pictures ON transactions.EventID = pictures.EventID "
    + ` where transactions.StudentID = ${req.params.student_id} AND transactions.Completed != 3`;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        } else {
           res.status(200).json({
               data: result
           }) 
        }
    })
})

//@route post
//@desc cancel a booked event
app.post('/history/transactions/:student_id/cancel/:event_id', auth, (req,res) =>{
    let sql = `UPDATE transactions SET Completed = 3 WHERE EventID = ${req.params.event_id} AND transactions.StudentID = ${req.params.student_id}`;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(200);
        }
    })
})


//@route get /wishlist
//@desc gets the user specific wishlist
//@access private

app.get('/wishlist/:id', auth, (req,res) =>{

    let sql = `SELECT distinct Id, Date,Price, Company, ShortDescription, EVENT_TYPE, Logo, Picture FROM EVENT 
    JOIN WISHLIST ON event.Id = wishlist.EventID join pictures on pictures.EventID = event.Id  where wishlist.StudentID = ${req.params.id} `
    db.query(sql, (err,result) =>{
        if(err){
            console.log(err.message);
        }

        res.status(200).json({
            data: result,
            size: result.length
        })
    })
})

//route to add an event to the wishlist of a user
app.post(`/wishlist/:id/:event_id`, auth, (req,res)=>{
    let sql = `INSERT INTO wishlist(StudentID, EventID)
     VALUES(${req.params.id},${req.params.event_id})`
     db.query(sql, (error, result)=>{
         if(error){
             console.log(error.message);
         } else {
             res.status(200).json({
                 data:result.insertId
             })
         }
     })
})
//route that removes a particular event from the user's wishlist
app.post(`/remove/wishlist/:id/:event_id`, auth, (req,res) =>{
    let sql = `DELETE FROM wishlist WHERE
     StudentID=${req.params.id} AND EventID=${req.params.event_id}`;
     
     db.query(sql, (err, result)=>{
         if(err){
             console.log(err);
         } else {
             console.log("Deleted from wishlist");
             res.status(200);
         }
     })
})

//route to select the user's wishlist events
app.get('/wishlist/:id/:event_id', auth, (req,res) =>{
 
    let sql = `SELECT * FROM wishlist 
    where wishlist.EventID =${req.params.event_id} AND wishlist.StudentID = ${req.params.id} `
    db.query(sql, (err,result) =>{
        if(err){
            console.log(err.message);
        }

        res.status(200).json({
            data: result,
            size: result.length
        })
    })
})

//Statistic routes

//@desc get average events hosted by a specific company
//@access private
app.get('/stats/avgcompany', auth, (req,res)=>{
    let sql = 'SELECT Company from event ORDER by Company Desc';
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.status(200).json({
                data: result,
                length: result.length    
            })
        }
    })
})

//@desc gets the most booked events
//@access private
app.get('/stats/avgevents', auth, (req,res)=>{
    let sql = "Select Company, EventID from transactions JOIN event ON event.Id = transactions.EventID";
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        } else{
            res.status(200).json({
                data:result
            })
        }
    })
})

//@desc get the number of users
//@access private
app.get('/stats/users', auth, (req,res)=>{
    let sql = "SELECT COUNT(*) AS userbase FROM users";
    db.query(sql, (err, result) =>{
        if(err){
            console.log(err);
        } else {
            res.status(200).json({
                data: result
            })
        }
    })
})

//this is for retrieving the user data from the
app.get('/', auth, (req,res) =>{
    let sql = `SELECT * FROM USERS where Id = ${req.user}`;

    db.query(sql, (error, result) =>{
        if(error){
            res.status(401).json({msg: "Unauthorized"});
        } else {
            res.status(200).json({
                data: result
            })
        }
    }) 
})



//@route /login
//@desc log the user in the application
//@access public

app.post('/login', [check('email', 'Email is required').isEmail(),
check('password', 'Enter a valid password').exists()], async(req,res) =>{

    const {email, password} = req.body
    console.log(email);
    console.log(password);
   //find user in database
   let sql = `SELECT * FROM USERS WHERE Email = ${JSON.stringify(email)} AND Password = ${JSON.stringify(password)}`;
  
   db.query(sql, (err,result) =>{
    if(err){
        console.log(err.message);
    }

    //if no user is found, return status code 404
    if(result.length === 0){
        res.status(404).json({msg: "No user found"})
    } 
    //if user is found, sign a jsonToken and forward it 
    else if(result){

    const payload = {
        user:{
            id:result[0].Id
        }
    }
      console.log('Route hit');
    jwt.sign({payload}, config.get('jwtSecret'), {expiresIn:36000}, (err,token)=>{
        res.json({
            token
        });
    })
      
    }

})

})



app.listen(PORT, ()=>{
    console.log(`Server started, listening on port ${PORT}`);
})