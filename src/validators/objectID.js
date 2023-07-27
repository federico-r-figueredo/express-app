const Joi = require('joi');

function validateObjectID(objectID) {
    const schema = Joi.object({
        _id: Joi.string().hex().length(24)
    });

    const result = {
        success: true,
        error: null,
        payload: null
    };

    if (schema.validate({ _id: objectID })?.error) {
        result.success = false;
        result.error = `The provided ID (${objectID}) doesn't follow a valid MongoDB ObjectID pattern.`;
    }

    return result;
}

module.exports = validateObjectID;
