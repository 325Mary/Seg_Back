
//estructura api
class EstructuraApi {

    estructor = {
        status  :'success',
        action  : 'next',
        show    : true,
        message : '',
        delay   : null,
        code    : 'SUC-001',
        results : null,
        debug   : '',
    }
    constructor(){
    }
    setEstado = (codigo, estado, mensaje) => {

        this.estructor.code = codigo;
        this.estructor.status = estado;
        this.estructor.message = mensaje;
    }
    setResultado =(ressult)=>{
        this.estructor.results = ressult
    }

    toResponse = () => {

        if (this.estructor.status !== 'success') {
            this.estructor.action = 'stop'
        }

        return{
            status  : this.estructor.status,
            action  : this.estructor.action ,
            show    : this.estructor.show ,
            message : this.estructor.message ,
            delay   : this.estructor.delay ,
            code    : this.estructor.code ,
            results : this.estructor.results ,
        }
    }
}

module.exports = EstructuraApi