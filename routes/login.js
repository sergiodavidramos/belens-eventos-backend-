var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) => {
	var body = req.body;

	Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al encontrar el usuario',
				errors: err,
			});
        }
        if(!usuarioDB){
            return res.status(400).json({
				ok: false,
				mensaje: 'Credenciales incorrectos',
				errors: err,
			});
        }
        if(body.password!=usuarioDB.password){
            return res.status(400).json({
				ok: false,
				mensaje: 'Credenciales incorrectos--password',
				errors: err,
			});
        }

		res.status(201).json({
            ok: true,
            Usuario:usuarioDB,
            id: usuarioDB._id
		});
	});
});

module.exports = app;
