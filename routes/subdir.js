const express = require('express')
const router = express.Router();
const path = require('path');


router.get('^/$|/index(.html)?', (req, res) => { //RegEx: must begin and end with a slash OR just get requrest for index.html. Can make .html optional
    res.sendFile(path.join(__dirname, '..','views', 'subdir', 'index.html')); //going out of routes folder into views folder

})


router.get('/test(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..','views', 'subdir', 'test.html')); //going out of routes folder into views folder

})


module.exports = router;

