const express = require('express')
const morgan = require('morgan')
const cors = require("cors");
const dbConnection = require("../database/db");
const cookieParser = require('cookie-parser');

class Server{
    constructor(){
        this.app=express()
        this.port=8080;
        this.authPath="/api/auth";
        this.reservesPath="/api/reserves";
        this.app.use(morgan('dev'));
        this.conectarDb();
        this.middlewares()
        this.routes();

    }
    async conectarDb(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors({origin:'https://restaurante-backend.onrender.com/',credentials:true}));
        this.app.use(express.json());
        this.app.use(cookieParser()); 
    }
    routes(){
        this.app.use(this.authPath,require("../routes/auth"))
        this.app.use(this.reservesPath,require("../routes/reserves"))

    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor esta activo en el puerto: ",this.port);
        })
    }

}


module.exports=Server;