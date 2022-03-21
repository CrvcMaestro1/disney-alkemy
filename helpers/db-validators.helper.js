const { Usuario, Genero, Pelicula } = require('../database/models');

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({
        where: { email }
    })
    if (existeEmail) {
        throw new Error('El correo ya está registrado')
    }
}

const generoExiste = async (nombre = '') => {
    const genero = await Genero.findOne({
        where: { nombre }
    })
    if (genero) {
        throw new Error('El género ya está registrado')
    }
}

const validarGenero = async (generoId = 0) => {
    const genero = await Genero.findOne({ where: { id: generoId } })
    if (!genero) {
        throw new Error('El genero no existe')
    }
}

const tituloExiste = async (titulo = '') => {
    const pelicula = await Pelicula.findOne({
        where: { titulo }
    })
    if (pelicula) {
        throw new Error('El titulo ya está registrado')
    }
}

module.exports = {
    emailExiste,
    generoExiste,
    validarGenero,
    tituloExiste
}