var express = require('express');

var app = express();

var Paquete = require('../models/paquetes');

// Rutas

// ====================================
// Obtener todos los paquetes
// ====================================
app.get('/', (req, res, next) => {
	Paquete.find({})
	.populate('servicios','nombre detalle precio')
	.exec((err, paquetes) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			paquetes: paquetes,
		});
	});
});

// ====================================
// Crear un nuevo paquete
// ====================================

app.post('/', (req, res) => {
	var body = req.body;

	var paquete = new Paquete({
		nombre: body.nombre,
		servicios: body.servicios,
		total: body.total,
	});

	paquete.save((err, paqueteGuardado) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear al paquete',
				errors: err,
			});
        }
        res.status(201).json({
            ok: true,
			paquete: paqueteGuardado,
			servicios: body.servicios
        });

    });
});

module.exports = app;
