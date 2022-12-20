const winston = require('winston');

const logger = winston.createLogger({
    transports : [
        new winston.transports.Console({ level:'verbose' }),
        new winston.transports.File({ filename: './logs/info.log', level:'info' }),
        new winston.transports.File({ filename: './logs/warn.log', level:'warn' }),
        new winston.transports.File({ filename: './logs/error.log', level:'error' }),
    ]
});

function getDate() {
    const d = new Date();
    const date = `[${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;
    return date;
};

module.exports = { logger, getDate };

