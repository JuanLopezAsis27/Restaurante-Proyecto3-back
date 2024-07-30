const {z} = require('zod')

const createReserveSchema =  z.object({
    hora: z.string({required_error:'Hora es requerida'}),
    telefono: z.number({required_error:'Telefono es requerido'}).min(9,{
    message:'El telefono debe tener al menos 9 caracteres'}),
    cantidadPersonas: z.number({required_error:'Telefono es requerido'})
})

module.exports={
    createReserveSchema
}

