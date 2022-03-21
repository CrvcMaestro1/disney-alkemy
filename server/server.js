const cors = require('cors')
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Paths
        this.authPath = '/v1/auth';
        this.genresPath = '/v1/genres';
        this.charactersPath = '/v1/characters';
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
        this.app.use(this.genresPath, require('../routes/genres.route'));
        this.app.use(this.charactersPath, require('../routes/characters.route'));
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log(`Server listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;