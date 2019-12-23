// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//inicializar variables
var app = express();

// CORS para que express nos permita hacer peticiones de otro lugar 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// importar Rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app.js');
var paqueteRoutes = require('./routes/paquetes');
var servicioRoutes = require('./routes/servicios');
var uploadRoutes = require('./routes/upload');
var imagesRoutes = require('./routes/imagenes');


// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/dbAgencia', (err, res)=>{
    if(err) throw err;

    console.log("Base de datos online")
})


//Rutas
app.use('/img', imagesRoutes)
app.use('/upload', uploadRoutes)
app.use('/servicio', servicioRoutes)
app.use('/paquete', paqueteRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/login', loginRoutes)
app.use('/', appRoutes)


//Escuchar peticiones
app.listen(3000,()=>{
    console.log("Express server puerto 3000 online")
});