const {z} = require('zod')

const registerSchema =  z.object({
    username: z.string({required_error: 'El nombre de usuario es requerido'}),
    email: z.string({required_error:'Email es requerido'}).email({message:'Email no valido'}),
    password: z.string({required_error:'La contraseña es requerido'}).min(6,{message:'La contraseña debe tener al menos 6 caracteres'})
})

const loginSchema= z.object({
    email: z.string({required_error: 'Email es requerido'}).email({message:'Email no valido'}),
    password: z.string({required_error:'La contraseña es requerido'}).min(6,{message:'La contraseña debe tener al menos 6 caracteres'})

})

module.exports = {
    registerSchema,loginSchema
}