const express = require("express")
const cors = require("cors")


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersRouter = "/api/users"
        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
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