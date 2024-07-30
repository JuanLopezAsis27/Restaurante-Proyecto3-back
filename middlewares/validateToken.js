const jwt = require('jsonwebtoken')

const authRequired = (req, res, next)=>{
    const {token} = req.cookies

    if(!token) return res.status(401).json({message:"No hay token, autorizacion denegada"})

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if (err) {
            return res.status(403).json({message:"token no valido"})
        }else{
            req.user=user
        }

        next();

    })

}

module.exports=authRequired