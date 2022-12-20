const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}; 
const products = require('./src/class/Products');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const hbs = require('express-handlebars');
const { json, urlencoded } = express;
const router = require('./src/moduls/rutas');
const chat = require('./src/class/Chat');
const { normalizar, desnormalize } = require('./src/moduls/normalizar');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { initPassport } = require('./src/middleware/passport');
const { option } = require('./src/moduls/config');
require('dotenv').config();
const { logger, getDate } = require('./logs/loggers');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(session({
    secret: process.env.SECRET_KEY_SESSION,
    store: MongoStore.create({ 
        mongoUrl: process.env.SECRET_URL_MONGO_ATLAS,
        mongoOptions: advancedOptions
    }),
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.engine('hbs', hbs.engine({
    extname:'.hbs',
    partialsDir: __dirname + '/src/views/partials',
    layoutsDir: __dirname + '/src/views/layouts',
    defaultLayout: 'layout.hbs'
}));

initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY_COOKIE));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(express.static('public'))
app.set('views', './src/views/partials');
app.set('view engine', 'hbs');
app.use(router);

io.on('connection', client => {
    logger.info(`Usuario [${client.id}] conectado ${getDate()}`);

    products.getAll().then(resp => {
        if(resp.length !== 0){
            io.sockets.emit('products', JSON.stringify(resp))
            io.on('products-shown', message => {
                console.log(message);
            }
        )};
    });

    client.on('new-Message', message => {
        let date = '';
        const newMessage = normalizar(message);
        chat.save(newMessage);
        chat.getAll().then(resp => {
            resp.forEach(posts => {
                date = desnormalize(posts);
                io.sockets.emit('show-messages', JSON.stringify(date));
            });
        });
    });

    client.on('disconnect', () => {
        logger.warn('Cliente desconectado');
    });
});

module.exports = {httpServer};