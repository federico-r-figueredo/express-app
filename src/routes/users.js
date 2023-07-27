const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/User');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, async (req, res) => {
    res.send(await User.find().limit(10).sort({ name: 1 }));
});

router.get('/current', authenticate, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user)
        return res.status(404).send({
            success: false,
            message: 'User not found.',
            payload: null
        });

    return res.send({
        success: true,
        message: null,
        payload: user
    });
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
