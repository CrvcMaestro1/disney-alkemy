const { Usuario } = require('../database/models');

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({
        where: { email }
    })
    if (existeEmail) {
        throw new Error('El correo ya está registrado')
    }
}

module.exports = {
    emailExiste
}