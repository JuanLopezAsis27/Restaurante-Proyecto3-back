const jwt = require('jsonwebtoken')

function createAccesToken(payload) {
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn:'1d'
            },
        (err,token)=>{
            if (err) {
                reject(err)
            }else{
                resolve(token)
            }
        })
    })
}

module.exports=createAccesToken


