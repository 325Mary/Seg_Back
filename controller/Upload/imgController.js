const modelImage = require('../../models/images/images')
const estructuraApi = require('../../helpers/estructuraApi')
let requestImages = require('../../models/DTO/request.Images')
const path = require('path')
const fs = require('fs-extra')

exports.UploadDocument = async (req, res) => {
    const api = new estructuraApi
    if (req.file != null) {
        const finalpath = req.file.path
        const { id_user, aprendiz_id } = req.body
        requestImages = req.body

        requestImages.path = finalpath /*.substring(8)*/
        requestImages.user_id = id_user
        requestImages.aprendiz_id = aprendiz_id

        if (id_user != "") {
            requestImages.aprendiz_id = null
            const allImages = await this.AllDocuments()
            const id_users = allImages.map(data => data.user_id, allImages)
            const repeat = await this.verifyUsersAndAprendices(id_user, id_users)
            if (repeat) {
                // res.json(route)
                const datos = await this.searchImage(id_user, true)
                this.deleteDocumentStoge(datos.path)
                await this.UpdateDocument(requestImages, id_user, api, true)
                const datos2 = await this.searchImage(id_user, true)
                api.setResultado(datos2)
            } else {
                await this.CreateImage(requestImages, api)
            }
        } else {
            requestImages.user_id = null
            const allImages = await this.AllDocuments()
            const id_aprendices = allImages.map(data => data.aprendiz_id, allImages)
            const repeat = await this.verifyUsersAndAprendices(aprendiz_id, id_aprendices)
            if (repeat) {
                // res.json(route)
                const datos = await this.searchImage(aprendiz_id, false)
                this.deleteDocumentStoge(datos.path)
                await this.UpdateDocument(requestImages, aprendiz_id, api, false)
                const datos2 = await this.searchImage(aprendiz_id, false)
                api.setResultado(datos2)
            } else {
                await this.CreateImage(requestImages, api)
            }
        }

    } else {
        api.setEstado('204', "error", "No seleccionaste ninguna imagen o el formato tiene que ser png , jpeg ,jgp , gif")
    }
    res.json(api.toResponse())
}

exports.ViewImage = (req, res) => {
    res.json()
}

exports.CreateImage = async (body, api) => {
    await modelImage.create(body).then(data => {
        console.log(data);
        if (data !== null) {
            api.setEstado('200', 'success', 'Image added succesfully')
            api.setResultado(data)
        } else {
            api.setEstado('error', 'erorr', 'erorr')
        }
    }).catch(err => {
        api.setEstado(err, 'erorr', err)
    })

}
exports.UpdateDocument = async (body, id, api, bool) => {
    if (bool) {
        await modelImage.update(
            body,
            {
                where: {
                    user_id: id
                }
            }).then(data => {
                if (data[0] > 0) {
                    api.setEstado("200", 'success', "Document Updated successfully")
                } else {
                    api.setEstado("204", 'Empty', "consult success but Empty")
                }
            }).catch(err => {
                api.setEstado(err, 'error', err)
            })
    } else {
        await modelImage.update(
            body,
            {
                where: {
                    aprendiz_id: id
                }
            }).then(data => {
                if (data[0] > 0) {
                    api.setEstado("200", 'success', "Document Updated successfully")
                } else {
                    api.setEstado("204", 'Empty', "consult success but Empty")
                }
            }).catch(err => {
                api.setEstado(err, 'error', err)
            })
    }
}

exports.verifyUsersAndAprendices = async (id, array) => {

    for (let index of array) {
        if (index == id) {
            return true
        }
    }
    return false
}


exports.AllDocuments = async () => {
    const data = await modelImage.findAll()
    // res.json(data)
    return data
}
exports.OneUImage = async (id) => {
    const data = await modelImage.findOne({ where: { id_photo: id } })
    return data
}
exports.MessagePrueba = async (req, res) => {
    res.json({ message: "success crack " })
}

exports.deletephoto = async (req, res) => {
    const api = new estructuraApi
    const { id_photo } = req.params
    const data = await this.OneUImage(id_photo)
    let rutaimage = ""
    let photo = {}

    if (data === null) {
        api.setEstado("200", 'error', `the id_photo{${id_photo}}not found`)
    } else {
        rutaimage = data.path
        photo = await modelImage.destroy({ where: { id_photo: id_photo } })
    }
    if (photo === 1) {
        this.deleteDocumentStoge(rutaimage)
        api.setEstado("200", 'success', "User destroy successfully")
        api.setResultado(data)
    }


    res.json(api.toResponse())
}

exports.deleteDocumentStoge = async (pathh) => {
    await fs.unlink(path.resolve(pathh))
}

exports.searchImage = async (id, bool) => {
    // const {user_id} = req.params

    if (bool) {
        return await modelImage.findOne({ where: { user_id: id } })
    }

    return await modelImage.findOne({ where: { aprendiz_id: id } })
}

exports.servicesOneImage = async (req, res) => {

    const api = new estructuraApi//instace the estructor api 

    const { user_id, aprendiz_id } = req.body

    let data

    if (user_id == '') {
        data = await modelImage.findOne({ where: { aprendiz_id } })
    } else {
        data = await modelImage.findOne({ where: { user_id } })
    }


    data !== null ? api.setResultado(data) : api.setEstado('204', 'error', "consult emty or not foud ")

    res.json(api.toResponse())
}

exports.destroimage = async (id) => {
    const api = new estructuraApi
    const data = await this.searchImage(id)
    let rutaimage = ""
    let photo = {}

    if (data === null) {
        api.setEstado("200", 'error', `the id_photo{${id}}not found`)
    } else {
        rutaimage = data.path
        photo = await modelImage.destroy({ where: { user_id: id } })
    }
    if (photo === 1) {
        this.deleteDocumentStoge(rutaimage)
        api.setEstado("200", 'success', "User destroy successfully")
        api.setResultado(data)
    }
    // res.json(api.toResponse())
}
