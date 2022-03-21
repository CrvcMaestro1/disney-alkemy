const { Router } = require('express');
const { check } = require('express-validator');
const { genresGet, genresPost, genresPut, genresDelete, genresGetOne } = require('../controllers/genres.controller');
const { generoExiste } = require('../helpers');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT
], genresGet);

router.post('/', [
    validarJWT,
    check('nombre').custom(generoExiste),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], genresPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], genresPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], genresDelete);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], genresGetOne)

module.exports = router;