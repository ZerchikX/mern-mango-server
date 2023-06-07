const uuid = require('uuid')
const path = require('path')
const {Tovar, TovarInfo} = require('../models/models')
const ApiError = require('../error/ApiError')


class TovarController {
    async create(req, res, next){
        console.log(req.body)
        try{

        let {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const tovar = await Tovar.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                    TovarInfo.create({
                        title: i.title,
                        description: i.description,
                        tovarId: tovar.id
                    })
                )
        }


        return res.json(tovar)

        }catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit

        let tovars;
        if(!brandId && !typeId){
            tovars = await Tovar.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            tovars = await Tovar.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            tovars = await Tovar.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            tovars = await Tovar.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(tovars)
    }
    async getOne(req, res){
        const {id} = req.params
        const tovar = await Tovar.findOne(
            {
                where: {id},
                include: [{model: TovarInfo, as: 'info'}]
            }
        )
        return res.json(tovar)
    }
}

module.exports = new TovarController()