var express = require('express');

var app = express();

var Carrito = require('../models/carrito');

// Rutas

// ====================================
// Obtener todos los servicios añadidos al carrito
// ====================================
app.get('/', (req, res, next) => {
	Carrito.find({})
    .populate('servicios','nombre')
    .populate('usuario','nombre')
	.exec((err, det) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			detalle: det,
		});
	});
});

// ====================================
// Crear un nuevo servicios añadidos al carrito
// ====================================

app.post('/', (req, res) => {
	var body = req.body;

	var carrito = new Carrito({
		usuario: body.usuario,
		servicios: body.servicios,
	});

	carrito.save((err, carritoGuardado) => {    
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear la promocion',
				errors: err,
			});
        }
        res.status(201).json({
            ok: true,
			detalle: carritoGuardado,
			// servicios: body.servicios
        });

    });
});

module.exports = app;
