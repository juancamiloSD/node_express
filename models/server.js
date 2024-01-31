const express = require("express")
const cors = require("cors");
const { dbConnection } = require("../database/config");


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersRouter = "/api/users"

        // Conexión
        this.conectarDB()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"))
    }

    routes(){
       this.app.use(this.usersRouter, require("../routes/user.routes"))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Corriendo app", this.port)
        })
    }
}

module.exports = Server;