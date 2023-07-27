function authorize(req, res, next) {
    if (req.user.role !== 'admin')
        return res.status(403).send({
            success: false,
            message: 'Acess denied',
            payload: null
        });

    next();
}

module.exports = authorize;
