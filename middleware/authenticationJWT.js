const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    let token = '';
    let decodedToken = null;
    
    const authorization = request.get('authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    
    if (!token) {
        return response.status(401).json({
            error: 'Token Missing or Invalid',
            message: 'No se proporcionó token de autenticación'
        });
    }
    
    try {
        decodedToken = jwt.verify(token, process.env.PASWORDTOKEN);
    } catch (error) {
        return response.status(403).json({
            error: 'Token Invalid or Expired',
            message: 'El token proporcionado no es válido o ha expirado'
        });
    }
    
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({
            error: 'Token Missing or Invalid',
            message: 'El token no contiene información de usuario válida'
        });
    }
    
    const { id: user_id } = decodedToken;
    request.user_id = user_id;
    
    request.user = decodedToken;
    
    next();
};