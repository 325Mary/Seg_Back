const jwt = require('jsonwebtoken');

class Token {
    sing = (object) => {
        let token = jwt.sign(object, process.env.PASWORDTOKEN, {
        });
        return token;
    }

    jsonlogin = () => {
        const userForToken = {
            id: user.id_usuario,
            identificacion: user.identificacion,
            pasword: user.contrasena,
        }
        return userForToken;
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                valid: false, 
                message: 'No se proporcionó token' 
            });
        }

        const decoded = jwt.verify(token, process.env.PASWORDTOKEN);
        
        req.userData = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar token:', error.message); 
        return res.status(401).json({ 
            valid: false, 
            message: 'Token inválido o expirado' 
        });
    }
};

module.exports = { Token, verifyToken };