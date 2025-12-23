const jwt = require('jsonwebtoken');
let token = ''
let decodedToken = {}
module.exports = (request , response , next ) =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7)
    }
    try{
        decodedToken = jwt.verify(token , process.env.PASWORDTOKEN)
    }catch {}
    if (!token || !decodedToken.id) {
        return response.status(401).json({
            error : 'Token Missing or Invalid'
        })
    }
    const {id : user_id}= decodedToken
    request.user_id = user_id
    next()
}