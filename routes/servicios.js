var express = require('express');

var app = express();

var Servicio = require('../models/servicios');

// Rutas

// ====================================
// Obtener todos los servicios
// ====================================
app.get('/', (req, res, next) => {
	Servicio.find({}).exec((err, servicios) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			servicios: servicios,
		});
	});
});

// ====================================
// Crear un nuevo servicio
// ====================================

app.post('/', (req, res) => {
	var body = req.body;

	var servicio = new Servicio({
		nombre: body.nombre,
		detalle: body.detalle,
        precio: body.precio,
        categoria: body.categoria
	});

	servicio.save((err, servicioGuardado) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear al servicio',
				errors: err,
			});
        }
        res.status(201).json({
            ok: true,
            servicio: servicioGuardado
        });

    });
});

// ====================================
// Obtener  los servicios por categoria
// ====================================
app.get('/:categoria', (req, res, next) => {

	var categoria = req.params.categoria;


	Servicio.find({categoria: categoria}).exec((err, servicios) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			servicios: servicios,
		});
	});
});


module.exports = app;
