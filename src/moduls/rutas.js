const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');
const products = require('../class/Products');
const multer = require('multer');
const path = require('path');
const { generarProducto } = require('./generarProducto');
const yargs = require('yargs/yargs')(process.argv.slice(2));
const { fork } = require('child_process');
const os = require('node:os');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('formulario');
});
/**
 * PRODUCTOS
 */
router.get('/productos', (req, res) => {
    products.getAll().then(date => {
        if(date.length!==0){
            date.forEach(element => res.render('productos', {element}));
        }else
            res.render('productos', {message:'No hay productos'});
    });
});
router.post('/productos', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    console.log(file)
    if(!file) {
        const err = new Error('No cargo el archivo,');
        err.httpStatusCode = 400;
        return next(err);
    }
    const { title, price } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: file.path
    }
    products.addProdutcs(product);
    res.redirect('/');
});
router.get('/productos-test', (req, res) => {
    const allProducts = generarProducto();
    products.addProdutcs(allProducts);
    res.json(generarProducto());
});
/**
 * LOGIN
 */
router.get('/api/login', (req, res) => {
    if(req.isAuthenticated()){
        let username = req.user.username;
        res.render('formulario', {username})
    }else{
        res.render('login')
    }
})
router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/api/login',
    failureRedirect: '/api/login'
}));
/**
 * LOGOUT
 */
router.get('/api/logout', (req, res) => {
    let username = req.user.username;
    req.session.destroy(err => {
        if(err) return res.send(err);
        res.render('logout', {username});
    });
})
/**
 * REGISTRO
 */
router.get('/api/signup', (req, res) => {
    res.render('register');
})
router.post('/api/signup', passport.authenticate('signup', {
    successRedirect: '/api/login',
    failureRedirect: '/api/signup'
}));
/**
 * INFO
 */
router.get('/api/info', (req, res) => {
    const argv = yargs.argv._;
    const path = process.cwd();
    const sistemaOperativo = process.platform;
    const versionNode= process.version['node'];
    const { arrayBuffers } = process.memoryUsage();
    const idProcess = process.pid;
    const execPath = process.execPath;
    const cpus = os.cpus().length;
    res.render('info', {
        path, sistemaOperativo, versionNode, arrayBuffers, idProcess, execPath, argv, cpus
    })
    //artillery quick --count 50 -n 20 http://localhost:8080/api/info > profiling/result_nolog.txt
    // node --prof-process profiling/nolog-v8.log > profiling/result_nolog.txt
});
router.get('/infolog', (req, res) => {

    console.log({
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    })

    res.json({
        argumentosDeEntrada: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.versions['node'],
        memoriaTotalReservada: process.memoryUsage()['rss'],
        exPath: process.argv[1],
        processID: process.pid,
        carpetaProyecto: process.cwd(),
        Procesadores: os.cpus().length
    })

    //artillery quick --count 50 -n 20 http://localhost:8080/api/info > profiling/result_log.txt
    // node --prof-process 14-Loggers/profiling/log-v8.log > profiling/result_log.txt
})
/**
 * RANDOMS
 */
router.get('/api/randoms', (req, res) =>{
    const number = parseInt(req.query.cant) || 100000000;
    const randoms = fork('randoms.js');
    randoms.send(number);
    randoms.on('message', message => {
        res.json(message);
    })
});

router.get('/api/datos', (req, res)=>{
    res.send(`Servidor express - PID: ${process.pid} - FyH: ${new Date().toLocaleString()}`)
})

module.exports = router;