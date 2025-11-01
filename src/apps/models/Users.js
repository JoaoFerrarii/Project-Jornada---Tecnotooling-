const { Model, Sequelize } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Users extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    //allowNull: false,
                    field: 'password', // Garante o mapeamento para a coluna 'password'
                },

                // Este é um campo VIRTUAL usado pra receber a senha em texto puro da requisição,
                // mas NÃO será salvo no banco de dados.
                password_hash: {
                    type: Sequelize.VIRTUAL,
                    allowNull: true, // Pode ser nulo ao *ler* do banco
                },

                matricula: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                ativo: {
                    type: Sequelize.SMALLINT,
                    allowNull: false,
                },
                dataAdmissao: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    field: 'dataAdmissao'
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique:true,
                },
                Admin: {
                    type: Sequelize.SMALLINT,
                    allowNull: false,
                    field: 'Admin'
                },
                idDepartamento: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'idDepartamento'
                },
                idCargo: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'idCargo'
                },
            },
            {
                sequelize,
                tableName: 'Usuario',
                timestamps: false
            },

        );

        // criptografar a senha antes de salvar
        this.addHook('beforeSave', async (user) => {
            if (user.password_hash) {
                user.password = await bcryptjs.hash(user.password_hash, 8);
            }
        });

        return this;
    }
    //verifica se password que esta sendo enviado e igual ao do banco
    checkPassword(password) {
        return bcryptjs.compare(password, this.password);

    }
}

module.exports = Users;