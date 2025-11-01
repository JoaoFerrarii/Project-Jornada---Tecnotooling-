const { verifyToken } = require('../../utils/token');
const { decrypt } = require('../../utils/crypt');

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    // verificar o token e extrair o payload
    const { userId } = await verifyToken(authHeader);
    //Descriptografa o ID que estava no payload
    const realUserId = decrypt(userId);
    req.userId = realUserId;
    return next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirad' });
  }
};

module.exports = verifyJwt;