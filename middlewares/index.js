const validarCampos = require('../middlewares/validar-campos.middleware')
const validarJWT = require('../middlewares/validar-jwt.middleware')

module.exports = {
    ...validarCampos,
    ...validarJWT
}