'use strict';

//const { SELECT } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('departamento', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        descricao: {
            allowNull: false,
            type: Sequelize.STRING
        }
    });

    await queryInterface.createTable('cargo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        descricao: {
            allowNull: false,
            type: Sequelize.STRING
        }
    });

    await queryInterface.createTable('Usuario', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        nome: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        matricula: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        ativo: {
            allowNull: false,
            type: Sequelize.SMALLINT
        },
        dataAdmissao: {
            allowNull: true,
            type: Sequelize.DATE
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        Admin: {
            allowNull: false,
            type: Sequelize.SMALLINT
        },
        idDepartamento: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'departamento',
                key: 'id'
            }
        },
        idCargo: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'cargo',
                key: 'id'
            }
        }
    });

    await queryInterface.createTable('sessao', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        status: {
            allowNull: false,
            type: Sequelize.SMALLINT
        },
        data: {
            allowNull: false,
            type: Sequelize.DATE
        },
        idUsuario: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                // CORRIGIDO
                model: 'Usuario',
                key: 'id'
            }
        }
    });

    await queryInterface.createTable('mensagem', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        texto: {
            allowNull: false,
            type: Sequelize.STRING
        },
        idSessao: {
            allowNull: true,
            // CORRIGIDO
            type: Sequelize.INTEGER,
            references: {
                model: 'sessao',
                key: 'id'
            }
        }
    });
},

  async down (queryInterface) {
    await queryInterface.dropTable('mensagem');
    await queryInterface.dropTable('sessao');
    await queryInterface.dropTable('Usuario');
    await queryInterface.dropTable('departamento');
    await queryInterface.dropTable('cargo');
  }
};
