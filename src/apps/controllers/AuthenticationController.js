//Controler para gerenciar sessao/login do usuario
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { encrypt } = require('../../utils/crypt');

class AuthenticationController {
 async authenticate(req, res) {
     const{ email, password } = req.body;
       //nao precisa dessa validacao pois o schemavalidator ja esta fazendo isso
       /*if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
        }*/
     const user = await Users.findOne({
            where: { email },
        });

         if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    //FAZER Validacao de usario desativado/inativo

    if (user.ativo !== 1) {
      return res.status(403).json({ error: 'Este usuário está inativo.' });
    }
   
    //desestruturação do obj,  registro do usuário que foi encontrado no banco de dados
      const { id, nome: nome } = user;
0
      // Lógica para criptografar o id antes de incluiro no token
        const { iv, content } = encrypt(id);
        const newId = `${iv}:${content}`;

    //autenticacao com o JWT, expiresIn(tempo expiracao token), e traz o payload do token com ID criptografado
        const token = jwt.sign({ userId:newId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(200).json({ user: { id, nome: nome }, token });
    
 }


}

module.exports = new AuthenticationController();