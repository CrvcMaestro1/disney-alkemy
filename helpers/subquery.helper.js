const { literal } = require("sequelize");

const subqueryPeliculaSerie = (movies) => {
    return literal(`EXISTS(SELECT * FROM "Personaje_PeliculaSeries" AS "PeliculasSeries" WHERE "PeliculasSeries"."peliculaSerieId" = ${movies})`)
}

module.exports = {
    subqueryPeliculaSerie
}