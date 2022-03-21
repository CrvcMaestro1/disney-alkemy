const { request, response } = require("express");
const { Op } = require("sequelize");
const { Personaje, Pelicula } = require('../database/models');

const charactersGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0, name = null, age = null, weight = null, movies = null } = req.query
    try {
        const listQueries = []
        name ? listQueries.push({ nombre: { [Op.like]: `%${name}%` } }) : null
        age ? listQueries.push({ edad: age }) : null
        weight ? listQueries.push({ peso: weight }) : null
        let where = listQueries.length > 0 ? {
            [Op.or]: listQueries
        } : {}

        const { count, rows: characters } = await Personaje.findAndCountAll({
            attributes: ['imagen', 'nombre'],
            where,
            offset,
            limit,
            raw: true,
            include: movies ? {
                model: Pelicula,
                through: { attributes: [] },
                where: { id: movies },
                attributes: ['titulo']
            } : null
        });

        res.json({
            characters,
            count
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const charactersPost = async (req = request, res = response) => {
    const { imagen, nombre, edad, peso, historia } = req.body
    try {
        const character = await Personaje.build({ imagen, nombre, edad, peso, historia })
        await character.save();
        res.status(201).json({
            character
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const charactersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...personaje } = req.body
    try {
        const updated = await Personaje.update(personaje, { where: { id } })
        if (updated) {
            const character = await Personaje.findOne({ where: { id } })
            return res.json({
                character
            })
        }
        res.status(404).json({
            message: 'Personaje no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const charactersDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const character = await Personaje.findOne({ where: { id } })
        if (character) {
            await character.destroy()
            return res.json({
                character
            })
        }
        res.status(404).json({
            message: 'Personaje no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const charactersGetOne = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const character = await Personaje.findOne({
            where: { id },
            attributes: ['id', 'nombre', 'imagen', 'edad', 'peso', 'historia',],
            include: [
                {
                    model: Pelicula,
                    through: { attributes: [] },
                    attributes: ['titulo']
                }
            ]
        })
        if (character) {
            return res.json({
                character
            })
        }
        res.status(404).json({
            message: 'Personaje no existe'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const charactersAddMovie = async (req = request, res = response) => {
    const { id } = req.params
    const { movie } = req.body
    try {
        const character = await Personaje.findOne({ where: { id } })
        const movieToAdd = await Pelicula.findOne({ where: { id: movie } })
        if (!character) {
            res.status(404).json({
                message: 'Personaje no existe'
            })
        }
        if (!movieToAdd) {
            res.status(404).json({
                message: 'Pelicula o serie no existe'
            })
        }
        character.addPelicula(movieToAdd)
        const resultCharacter = await Personaje.findOne({
            where: { id },
            attributes: ['id', 'nombre', 'imagen', 'edad', 'peso', 'historia',],
            include: [
                {
                    model: Pelicula,
                    through: { attributes: [] },
                    attributes: ['titulo']
                }
            ]
        })
        return res.json({
            character: resultCharacter
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

module.exports = {
    charactersGet,
    charactersPost,
    charactersPut,
    charactersDelete,
    charactersGetOne,
    charactersAddMovie
}