var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

// Rutas

// ====================================
// Obtener todos los usuarios
// ====================================
app.get('/', (req, res, next) => {
	Usuario.find({}, 'nombre email telefono').exec((err, usuarios) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error en la base de datos',
				errors: err,
			});
		}

		res.status(200).json({
			ok: true,
			usuarios: usuarios,
		});
	});
});

// ====================================
// Crear un nuevo usuario
// ====================================

app.post('/', (req, res) => {
	var body = req.body;

	var usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: body.password,
		telefono: body.telefono,
	});

	usuario.save((err, usuarioGuardado) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear al usuario',
				errors: err,
			});
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    });
});

module.exports = app;
