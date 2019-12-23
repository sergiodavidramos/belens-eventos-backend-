var express = require('express');

var fileUpload = require('express-fileupload');

var fs = require('fs');

var app = express();

var Paquete = require('../models/paquetes')
var Servicio = require('../models/servicios')
var Promo = require('../models/promociones')


app.use(fileUpload());

app.put('/:tipo/:id',(req, res, next)=>{

    var tipo= req.params.tipo;
    var id = req.params.id;

    var tiposValidos = ['paquete','servicio','promo'];

    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400),json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: {message: 'los tipos son paquete, servicio, promo'}
        });
    }

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'no selecciono nada',
            errors: {message: 'Debe selecionar una imagen'}
        });
    }

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extencionArchivo = nombreCortado[ nombreCortado.length -1];

    var extencionesValidas =['png','jpg','gif','jpeg',];

    if(extencionesValidas.indexOf(extencionArchivo)<0){
        return res.status(400),json({
            ok: false,
            mensaje: 'Extencion no valida',
            errors: {message: 'Las extenciones validas son: '+ extencionesValidas.join(', ')}
        });
    }

    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencionArchivo}`;

    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err=>{
        if(err){
            return res.status(500),json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                errors: err
            });
        }
        subirPorTipo( tipo, id, nombreArchivo, res);

    })
})

function subirPorTipo(tipo, id, nombreArchivo, res){

    if(tipo==='paquete'){
        Paquete.findById(id,(err, paquete)=>{

            if(!paquete){
                return res.status(400),json({
                    ok: false,
                    mensaje: 'El paquete no existe',
                    errors: err
                });
            }

            var pathViejo = './uploads/paquete/'+paquete.img;

            console.log(pathViejo);

            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo)
            }

            paquete.img = nombreArchivo;

            paquete.save((err, paqueteActualizado)=>{
                
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de paquete actualizada',
                    paquete: paqueteActualizado
                });
            });
        });
    }

    if(tipo==='promo'){
        Promo.findById(id,(err, promocion)=>{

            if(!promocion){
                return res.status(400),json({
                    ok: false,
                    mensaje: 'La promocion no existe',
                    errors: err
                });
            }

            var pathViejo = './uploads/promo/'+promocion.img;

            console.log(pathViejo);

            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo)
            }

            promocion.img = nombreArchivo;

            promocion.save((err, promoActualizado)=>{
                
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de paquete actualizada',
                    paquete: promoActualizado
                });
            });
        });
    }

    if(tipo==='servicio'){
        Servicio.findById(id,(err, servicio)=>{

            if(!servicio){
                return res.status(400),json({
                    ok: false,
                    mensaje: 'EL servicio no existe',
                    errors: err
                });
            }

            var pathViejo = './uploads/servicio/'+servicio.img;

            console.log(pathViejo);

            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo)
            }

            servicio.img = nombreArchivo;

            servicio.save((err, servicioActualizado)=>{
                
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de servicio actualizada',
                    paquete: servicioActualizado
                });
            });
        });
    }
};


module.exports = app;