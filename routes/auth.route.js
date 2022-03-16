const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth.controller');
const { emailExiste } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/register', [
    check('email').custom(emailExiste),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Un correo válido es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], register);

module.exports = router;