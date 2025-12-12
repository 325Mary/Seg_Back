
const jwt = require('jsonwebtoken');

class Token {
    sing =(object) => {
        let token =  jwt.sign(object, process.env.PASWORDTOKEN,
            { expiresIn: '2' });
        return token
    }

    jsonlogin =  ()=>{
        const userForToken = {
            id : user.id_usuario,
            identificacion : user.identificacion,
            pasword : user.contrasena,
        }
        return userForToken
    }
}

module.exports = Token