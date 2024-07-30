const { Schema, model } = require("mongoose");
const UserSchema = Schema({
    username: {
        type:String,
        required:[true,"Este campo es obligatorio"]
    },
    email: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    password: {
        type:String,
        required:[true, "Este campo es obligatorio"]
    },
    admin:{
        type:Boolean,
        default:false
    },
    state:{
        type:Boolean,
        default:true
    }
})

UserSchema.methods.toJSON=function() {
    const {__v,_id,...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario

}

module.exports = model("User", UserSchema)