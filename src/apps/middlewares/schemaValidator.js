const { Validator } = require('jsonschema');
const validator = new Validator();

const schemaValidator = (schema) => (req, res, next) => {
    const result = validator.validate(req.body, schema);

    if (!result.valid) {
        // Mapeando erros pra ser mais intuitivo
        const errors = result.errors.map(error => {
            
            let field = error.property.replace('instance.', ''); 
            let message = error.message; 


            //  Se o erro for campo faltante
            if (error.name === 'required') {
                const requiredField = error.argument; 
                if (schema.errorMessage && schema.errorMessage.required && schema.errorMessage.required[requiredField]) {
                    message = schema.errorMessage.required[requiredField]; //aqui pega a mensagem la do auth
                    field = requiredField;
                } else {
                    message = `O campo '${requiredField}' é obrigatório.`; 
                }
            } 
            //erro de formatacao
            else if (schema.properties[field] && schema.properties[field].errorMessage) {
            
                message = schema.properties[field].errorMessage;
            }

            return { field, message };
        });

        return res.status(400).json({
            error: 'Erro de validação.',
            details: errors
        });
    }

    return next();
};

module.exports = schemaValidator;