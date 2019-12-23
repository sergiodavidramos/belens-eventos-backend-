var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicioSchema = new Schema({
	nombre: { type: String, required: [true, 'el nombre del servicio es necesario'] },
	detalle: { type: String, required: [true, 'Los detalles son necesarios'] },
	precio: { type: Number, required: [true, 'El precio es necesario'] },
	categoria: { type: String, required: [true, 'La categoria es necesaria'] },
	img:{type: String, required: false}
});

module.exports = mongoose.model('servicio', servicioSchema);
