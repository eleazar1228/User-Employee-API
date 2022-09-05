// const whitelist = [
// 'https://www.google.com', 
// 'http://127.0.0.1:5500', 
// 'http://localhost:3500'];  

const allowedOrigins = require('./allowedOrigins')
 
exports.corsOptions == {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 ||!origin) { //if domain in the whitelies
            callback(null, true) // origin sent back saying it is allowed
        } else {
            callback(new Error('Not allowed by CORS'));
        } 
    },
    optionsSuccessStatus: 200 

}



