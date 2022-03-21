const { request, response } = require("express");
const { Op } = require("sequelize");
const { Genero, Pelicula } = require('../database/models');

const genresGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0, name = null } = req.query
    try {
        const listQueries = []
        name ? listQueries.push({ nombre: { [Op.like]: `%${name}%` } }) : null
        let where = listQueries.length > 0 ? {
            [Op.or]: listQueries
        } : {}

        const { count, rows: genres } = await Genero.findAndCountAll({
            attributes: ['imagen', 'nombre'],
            where,
            offset,
            limit,
            raw: true
        });

        res.json({
            genres,
            count
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const genresPost = async (req = request, res = response) => {
    const { imagen, nombre } = req.body
    try {
        const genre = await Genero.build({ imagen, nombre })
        await genre.save();
        res.status(201).json({
            genre
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const genresPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...genero } = req.body
    try {
        const updated = await Genero.update(genero, { where: { id } })
        if (updated) {
            const genre = await Genero.findOne({ where: { id } })
            return res.json({
                genre
            })
        }
        res.status(404).json({
            message: 'Género no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const genresDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const genre = await Genero.findOne({ where: { id } })
        if (genre) {
            await genre.destroy()
            return res.json({
                genre
            })
        }
        res.status(404).json({
            message: 'Género no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const genresGetOne = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const genre = await Genero.findOne({
            where: { id },
            attributes: ['id', 'nombre', 'imagen'],
            include: [
                {
                    model: Pelicula,
                    through: { attributes: [] },
                    attributes: ['titulo'],
                }
            ]
        })
        if (genre) {
            return res.json({
                genre
            })
        }
        res.status(404).json({
            message: 'Género no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

module.exports = {
    genresGet,
    genresPost,
    genresPut,
    genresDelete,
    genresGetOne
}