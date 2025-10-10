module.exports = (error, request , response , next )=>{
    console.log("_____________________________________________")
    console.log(error)
    console.log("_____________________________________________")
    response.send(request.ip)
    next()

    /*not funtion middeware*/
}



