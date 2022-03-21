const { request, response } = require("express");
const { Op } = require("sequelize");
const { Pelicula, Genero, Personaje } = require('../database/models');

const moviesGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0, name = null, genre = null, order = null } = req.query
    try {
        const listQueries = []
        name ? listQueries.push({ titulo: { [Op.like]: `%${name}%` } }) : null
        genre ? listQueries.push({ generoId: genre }) : null
        let where = listQueries.length > 0 ? {
            [Op.or]: listQueries
        } : {}

        const { count, rows: movies } = await Pelicula.findAndCountAll({
            attributes: ['imagen', 'titulo', 'fechaCreacion'],
            where,
            offset,
            limit,
            raw: true,
            order: order ? [['titulo', order]] : null
        });

        res.json({
            movies,
            count
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const moviesPost = async (req = request, res = response) => {
    const { imagen, titulo, calificacion } = req.body
    try {
        const fechaCreacion = new Date()
        const movie = await Pelicula.build({ imagen, titulo, calificacion, fechaCreacion })
        await movie.save();
        res.status(201).json({
            movie
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const moviesPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { fechaCreacion, ...pelicula } = req.body
    try {
        const updated = await Pelicula.update(pelicula, { where: { id } })
        if (updated) {
            const movie = await Pelicula.findOne({ where: { id } })
            return res.json({
                movie
            })
        }
        res.status(404).json({
            message: 'Pélicula o Serie no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const moviesDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const movie = await Pelicula.findOne({ where: { id } })
        if (movie) {
            await movie.destroy()
            return res.json({
                movie
            })
        }
        res.status(404).json({
            message: 'Película o Serie no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const moviesGetOne = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const movie = await Pelicula.findOne({
            where: { id },
            attributes: ['id', 'titulo', 'imagen', 'fechaCreacion', 'calificacion',],
            include: [
                {
                    model: Personaje,
                    through: { attributes: [] },
                    attributes: ['nombre'],
                },
                {
                    model: Genero,
                    through: { attributes: [] },
                    attributes: ['nombre'],
                }
            ]
        })
        if (movie) {
            return res.json({
                movie
            })
        }
        res.status(404).json({
            message: 'Película o Serie no existe'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const moviesAddGenre = async (req = request, res = response) => {
    const { id } = req.params
    const { genre } = req.body
    try {
        const movie = await Pelicula.findOne({ where: { id } })
        const genreToAdd = await Genero.findOne({ where: { id: genre } })
        if (!movie) {
            res.status(404).json({
                message: 'Película no existe'
            })
        }
        if (!genreToAdd) {
            res.status(404).json({
                message: 'Género no existe'
            })
        }
        movie.addGenero(genreToAdd)
        const resultMovie = await Pelicula.findOne({
            where: { id },
            attributes: ['id', 'titulo', 'imagen', 'fechaCreacion', 'calificacion',],
            include: [
                {
                    model: Personaje,
                    through: { attributes: [] },
                    attributes: ['nombre'],
                },
                {
                    model: Genero,
                    through: { attributes: [] },
                    attributes: ['nombre'],
                }
            ]
        })
        return res.json({
            movie: resultMovie
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

module.exports = {
    moviesGet,
    moviesPost,
    moviesPut,
    moviesDelete,
    moviesGetOne,
    moviesAddGenre
}