const { Schema, model } = require("mongoose");
const ReserveSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true, "Este campo es obligatorio"]
    },
    dia: {
        type:Date,
        default: Date.now()
    },
    hora: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    telefono: {
        type:Number,
        required:[true, "Este campo es obligatorio"]
    },
    cantidadPersonas:{
        type:Number,
        required:[true, "Este campo es obligatorio"]
    },
    state:{
        type:Boolean,
        default:true
    },
    
})

ReserveSchema.methods.toJSON=function() {
    const {__v,_id,...reserva} = this.toObject();
    reserva.rid=_id;
    return reserva

}

module.exports = model("Reserve", ReserveSchema)