const { Usuario, Genero } = require('../database/models');

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

module.exports = {
    emailExiste,
    generoExiste
}