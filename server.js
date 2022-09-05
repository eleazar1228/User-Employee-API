require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
//const logEvents  = require('./middleware/logEvents')
const { logger }  = require('./middleware/logEvents');
const  errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser  = require('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const { useCallback } = require('react');
const PORT = process.env.PORT || 3500;
const router = require('./routes/subdir')

//Connect to MonoDB
connectDB.connectDB()

app.use(logger);/* We moved the above 
                    middleware logger to logEvents. made it a variable and requested it in this file (5)*/

//app.use(credentials.credentials)

// Cross origin Resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle url encoded data (formed data)
app.use(express.urlencoded({ extended: false})); 

//build-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, 'public'))); /*//Express will search public directory for request before going thorugh routes
                                                         these files are available to the public */                                                   
//Router handlers at root
app.use('/', require('./routes/root'))

//app.use('/test', require('./rout'))


//Route handlers fir registration.
app.use('/register', require('./routes/register'))

//Route handlers for authentication.
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))

//route when deleting cookie
app.use('/logout', require('./routes/logout'))
app.use(verifyJWT.verifyJWT);


//Router handlers for users
app.use('/users', require('./routes/api/users'))


//Route handlers for employees.
app.use('/employees', require('./routes/api/employees'));






//Route handlerss
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attemped to load hello.html')
    next()
}, (res, req) => {
    res.send('Hello World');
})

//chaining rout handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);


//Customizing 404
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) { // iF you type html
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) { // iF you type html
        res.json({erro:"404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found");
    }
  
}) //Catch unknown http request not specifie*/

/*
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message);
}) 
*/
app.use(errorHandler.errorHandler)


//Only listening to port requrest when we are connected to MONGODB succesfuuly
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})




//add listerner for log event

/*setTimeout(() => {
    //Emit events of activites that happened
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);*/

//app.use is for middleware. Does not accept regez
//app.dall for routing. will accpet all http request at once