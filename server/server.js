const cors = require('cors')
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Paths
        this.authPath = '/v1/auth';
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parser del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'));
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log(`Server listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;