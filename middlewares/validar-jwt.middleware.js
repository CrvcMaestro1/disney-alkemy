const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { Usuario } = require('../database/models')


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            message: 'No existe x-token en la petición'
        })
    }
    try {
        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findByPk(uuid)
        if (!usuario) {
            return res.status(401).json({
                message: 'Token no válido'
            })
        }
        req.usuario = usuario
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}