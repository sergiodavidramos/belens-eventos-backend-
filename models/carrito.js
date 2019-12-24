var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var carritoSchema = new Schema({
	usuario: { type: Schema.Types.ObjectId, ref:'Usuario', required: [true, 'el Usuario es necesario'] },
	servicios: [{ type: Schema.Types.ObjectId , ref:['servicio', 'promo', 'paquete'], required: [true, 'Los servicios son necesarios'] }],
	// total: { type: Number, required: [true, 'El total es necesario'] }
    //  fecha: { type: Date, required: [true, 'La fecha es necesaria'] },
});

module.exports = mongoose.model('carrito', carritoSchema);
