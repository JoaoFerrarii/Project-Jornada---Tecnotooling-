const { Op } = require('sequelize');
const Users = require('../models/Users'); 

class UserController {
 
  async create(req, res) {
    const {
      nome,
      email,
      password, // Este 'password' vem do seu schema ( puro)
      confirm_password,
      matricula,
      idDepartamento,
      idCargo
    } = req.body;

    // Verificação de Senhas
    if (password !== confirm_password) {
      return res.status(400).json({
        error: 'Validação falhou',
        details: [{ field: 'confirm_password', message: 'As senhas não conferem.' }]
      });
    }

    try {
      // Verifica se já existe um usuário com este e-mail OU esta matrícula
      const userExists = await Users.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { matricula: matricula }
          ]
        }
      });

      if (userExists) {
        // Informa ao usuário qual campo está duplicado
        const field = userExists.email === email ? 'E-mail' : 'Matrícula';
        return res.status(400).json({ error: `${field} já cadastrado.` });
      }

      //Criação do Usuário no Banco
      const newUser = await Users.create({
        nome,
        email,
        matricula,
        idDepartamento,
        idCargo,
        // O seu model espera a senha pura no campo VIRTUAL 'password_hash'.
        // Nós pegamos o campo 'password' (que veio do req.body) e o passamos para o campo 'password_hash' que o model espera.
        password_hash: password, 
        ativo: 1, 
        Admin: 0, 
      });

      //  Resposta de Sucesso O campo 'password_hash' é virtual, então não será retornado.
      // O campo 'password' (o hash real) é retornado por padrão,
      // por isso criamos um objeto de resposta limpo.
      return res.status(201).json({
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
        matricula: newUser.matricula,
        ativo: newUser.ativo,
        Admin: newUser.Admin
      });

    } catch (error) {
        console.error('DETALHES DO ERRO AO CRIAR:', error);
      //Captura qualquer outro erro 
      return res.status(500).json({
        error: 'Erro interno ao criar usuário.',
        details: error.message
      });
    }
  }
}

module.exports = new UserController();