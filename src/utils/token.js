//logica de desicriptar o jwt
// normalmente o Front envia o token assim BEARER safsdsfasdsdass, ai comprimimos e pegamos apenas a segunda parte usando o split
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyToken  = async (authHeader) => {
  const [, token] = authHeader.split(' ');

  return promisify(jwt.verify)(token, process.env.JWT_SECRET);//verifica o jwt que estamo passando
};

module.exports = { verifyToken };