const BoxModel = require('../models/box');

class BoxController {
    async store(req, res) {
        const Box = await BoxModel.create({ title: req.body.title });

        return res.json(Box);
    }

    async show(req, res) {
        const box = await BoxModel.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(box);
    }
}

module.exports = new BoxController();