var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var promoSchema = new Schema({
	nombre: { type: String, required: [true, 'el nombre de la promo es necesario'] },
	servicios: [{ type: Schema.Types.ObjectId, ref:'servicio', required: [true, 'Los servicios son necesarios'] }],
    total_antes: { type: Number, required: [true, 'El total es necesario'] },
    precio: { type: Number, required: [true, 'El total de la promo es necesario'] },
	fecha: { type: Date, required: [true, 'La fecha es necesaria'] },
	img:{type: String, required: false}
});

module.exports = mongoose.model('promo', promoSchema);
