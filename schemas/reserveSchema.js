const {z} = require('zod')

const createReserveSchema =  z.object({
    dia: z.string({required_error:'El dia es requerido'}),
    hora: z.string({required_error:'Hora es requerida'}),
    telefono: z.number({required_error:'Telefono es requerido'}).gt(999999,{message:'El telefono debe tener al menos 7 caracteres'}).
    lt(999999999999,{message:'Numero no valido'}).int({message:'Numero no valido'}).positive({message:"Numero no valido"}),
    cantidadPersonas: z.number({required_error:'La cantidad de comensales es requerida'})
})

module.exports={
    createReserveSchema
}

