const { Router } = require('express');
const { check } = require('express-validator');
const { charactersPost, charactersGet, characterPut } = require('../controllers/characters.controller');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT
], charactersGet);

router.post('/', [
    validarJWT,
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad debe ser númerica').isNumeric(),
    check('peso', 'El peso debe ser númerico: 80.00').isDecimal(),
    check('historia', 'La historia es obligatoria').not().isEmpty(),
    validarCampos
], charactersPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isInt(),
    validarCampos
], characterPut);

module.exports = router;