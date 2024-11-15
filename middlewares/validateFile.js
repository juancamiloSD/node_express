const validateFile = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ 
            msg: 'No hay ningun archivo para subir.'
        });
    }
    next();
}

module.exports = { 
    validateFile 
};