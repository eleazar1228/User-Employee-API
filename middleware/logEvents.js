

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}


const logger = ((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt'); //2 param: 1(loggin method, where it iscoming from, and what url was reuqested) 2(name of file to create and input that informaiton)
    console.log(`${req.method} ${req.path}`);
    next();
})
//module.exports = logEvents;

//console.log(format(new Date(), 'yyyy-MM-dd'))

//console.log(uuid())

//console.log('huuuuuu')

//Error for NOT FINDING DATE-FNS

//module.exports.logEvents = logEvents;
//module.exports.logger = logger
module.exports = { logger, logEvents };