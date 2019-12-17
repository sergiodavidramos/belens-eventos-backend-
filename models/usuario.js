var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	nombre: { type: String, required: [true, 'el nombre del usuario es necesario'] },
	email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
	password: { type: String, required: [true, 'La contrasela es necesaria'] },
	telefono: { type: Number, required: [true, 'El numero de telefono es necesario'] },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
