const { Router } = require('express');
const { check } = require('express-validator');
const { moviesGet, moviesPost, moviesPut, moviesDelete, moviesGetOne, moviesAddGenre } = require('../controllers/movies.controller');
const { validarGenero, tituloExiste } = require('../helpers/db-validators.helper');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT,
    check('order', 'ASC para ordenar en ascendente, DESC para descendente').isIn(['ASC', 'DESC']),
    validarCampos
], moviesGet);

router.post('/', [
    validarJWT,
    check('titulo').custom(tituloExiste),
    check('generoId').custom(validarGenero),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('calificacion', 'La calificación debe ser del 1 al 5').isIn([1, 2, 3, 4, 5]),
    check('generoId', 'No es un ID válido').isInt(),
    validarCampos
], moviesPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], moviesPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], moviesDelete);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], moviesGetOne)

router.post('/:id/genres', [
    validarJWT,
    check('id', 'No es un ID válido').isInt(),
    check('genre', 'El ID de género es obligatorio').isInt(),
    validarCampos
], moviesAddGenre);

module.exports = router;