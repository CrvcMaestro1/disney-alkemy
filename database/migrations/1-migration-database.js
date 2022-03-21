'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Personajes", deps: []
 * createTable "Generos", deps: []
 * createTable "Usuarios", deps: []
 * createTable "Peliculas", deps: [Generos]
 *
 **/

var info = {
    "revision": 1,
    "name": "migration-database",
    "created": "2022-03-21T14:56:26.041Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Personajes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "nombre": {
                    "type": Sequelize.STRING,
                    "field": "nombre",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "imagen": {
                    "type": Sequelize.STRING,
                    "field": "imagen",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "edad": {
                    "type": Sequelize.INTEGER,
                    "field": "edad",
                    "validate": {
                        "min": 1,
                        "isInt": true
                    },
                    "allowNull": false
                },
                "peso": {
                    "type": Sequelize.DECIMAL(10, 2),
                    "field": "peso",
                    "allowNull": false
                },
                "historia": {
                    "type": Sequelize.STRING,
                    "field": "historia",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Generos",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "nombre": {
                    "type": Sequelize.STRING,
                    "field": "nombre",
                    "validate": {
                        "notEmpty": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "imagen": {
                    "type": Sequelize.STRING,
                    "field": "imagen",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Usuarios",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true,
                        "notEmpty": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Peliculas",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "titulo": {
                    "type": Sequelize.STRING,
                    "field": "titulo",
                    "validate": {
                        "notEmpty": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "imagen": {
                    "type": Sequelize.STRING,
                    "field": "imagen",
                    "validate": {
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "fechaCreacion": {
                    "type": Sequelize.DATEONLY,
                    "field": "fechaCreacion",
                    "validate": {
                        "isDate": true
                    },
                    "allowNull": false
                },
                "calificacion": {
                    "type": Sequelize.INTEGER,
                    "field": "calificacion",
                    "validate": {
                        "min": 1,
                        "max": 5
                    },
                    "allowNull": false
                },
                "generoId": {
                    "type": Sequelize.INTEGER,
                    "field": "generoId"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "GeneroId": {
                    "type": Sequelize.INTEGER,
                    "field": "GeneroId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Generos",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
