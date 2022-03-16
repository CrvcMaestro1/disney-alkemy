const { request, response } = require("express");
const { Op } = require("sequelize");
const { Personaje } = require('../database/models');
const { subqueryPeliculaSerie } = require("../helpers");

const charactersGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0, name = null, age = null, weight = null, movies = null } = req.query
    try {
        const listQueries = []
        name ? listQueries.push({ nombre: { [Op.like]: `%${name}%` } }) : null
        age ? listQueries.push({ edad: age }) : null
        weight ? listQueries.push({ peso: weight }) : null
        movies ? listQueries.push(subqueryPeliculaSerie(movies)) : null
        let where = listQueries.length > 0 ? {
            [Op.or]: listQueries
        } : {}

        const { count, rows: characters } = await Personaje.findAndCountAll({
            attributes: ['imagen', 'nombre'],
            where,
            offset,
            limit,
            raw: true
        });

        res.json({
            characters,
            count
        })
    } catch (error) {
        console.log(error)
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

const characterPut = async (req = request, res = response) => {
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

module.exports = {
    charactersGet,
    charactersPost,
    characterPut
}