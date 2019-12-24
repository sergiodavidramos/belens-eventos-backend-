var express = require('express');

var app = express();

var Promo = require('../models/promociones');

// Rutas

// ====================================
// Obtener todos los paquetes
// ====================================
app.get('/', (req, res, next) => {
	Promo.find({})
	.populate('servicios','nombre detalle precio')
	.exec((err, promos) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			promo: promos,
		});
	});
});

// ====================================
// Crear un nuevo paquete
// ====================================

app.post('/', (req, res) => {
	var body = req.body;

	var promo = new Promo({
		nombre: body.nombre,
		servicios: body.servicios,
        total_antes: body.total_antes,
        precio: body.precio,
        fecha: body.fecha
	});

	promo.save((err, promoGuardado) => {    
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear la promocion',
				errors: err,
			});
        }
        res.status(201).json({
            ok: true,
			promo: promoGuardado,
			servicios: body.servicios
        });

    });
});

module.exports = app;
