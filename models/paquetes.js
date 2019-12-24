var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paqueteSchema = new Schema({
	nombre: { type: String, required: [true, 'el nombre del paquete es necesario'] },
	servicios: [{ type: Schema.Types.ObjectId , ref:'servicio', required: [true, 'Los servicios son necesarios'] }],
	precio: { type: Number, required: [true, 'El total es necesario'] },
	img:{type: String, required: false}
	// fecha: { type: Date, required: [true, 'La fecha es necesaria'] },
});

module.exports = mongoose.model('paquete', paqueteSchema);
