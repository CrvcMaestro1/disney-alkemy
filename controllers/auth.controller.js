const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { generarJWT, getEmail, generateTemplate, getMsg, sendMail } = require('../helpers')
const { Usuario } = require('../database/models');

const login = async (req = request, res = response) => {
    const { email, password } = req.body
    try {

        const usuario = await Usuario.findOne({
            where: { email }
        })
        if (!usuario) {
            return res.status(400).json({
                message: 'Usuario y contraseña incorrectos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                message: 'Usuario y contraseña incorrectos'
            })
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

const register = async (req = request, res = response) => {
    const { name, email, password } = req.body
    try {
        const usuario = await Usuario.build({ name, email, password })

        const salt = bcryptjs.genSaltSync(10)
        usuario.password = bcryptjs.hashSync(password, salt)

        const header_email = getEmail(usuario.name)
        const template = generateTemplate(header_email)
        const message = getMsg(usuario.email, 'Bienvenido a Disney Alkemy', template)

        await Promise.all([
            usuario.save(),
            sendMail(message)
        ])

        res.json({
            usuario
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error, hable con el administrador'
        })
    }
}

module.exports = {
    login,
    register
}