const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    const { error } = validate(req);
    if (error)
        return res.status(400).send({
            success: false,
            error: error.details[0].message,
            payload: null
        });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({
            success: false,
            error: 'Invalid email',
            payload: null
        });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid)
        return res.status(400).send({
            success: false,
            error: 'Invalid password',
            payload: null
        });

    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        config.get('jwt.privateKey')
    );

    res.send({
        success: true,
        error: null,
        payload: token
    });
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req.body);
}

module.exports = router;
