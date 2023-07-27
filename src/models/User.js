const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            minlength: 4,
            maxlength: 50,
            required: true
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 255,
            unique: true,
            required: true
        },
        password: {
            type: String,
            minLength: 5,
            maxLength: 1024,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'trainer', 'trainee'],
            default: 'trainee'
        }
    })
);

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(1024).required(),
        role: Joi.string()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;
