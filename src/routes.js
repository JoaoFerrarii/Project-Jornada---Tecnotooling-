const {Router}  = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const verifyJwt  = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authschema = require('./schema/auth.schema.json');

const UserController = require('./apps/controllers/UserController');
const createUserSchema = require('./schema/createUser.schema.json');

const routes = new Router();

routes.get('/health', (req, res) => res.send({
  message: 'Connected com successo!',
}));

routes.post('/auth', schemaValidator(authschema), AuthenticationController.authenticate);

routes.post('/users', schemaValidator(createUserSchema), UserController.create);

routes.use(verifyJwt)

module.exports =routes;