const FileModel = require('../models/file');
const BoxModel = require('../models/box');

class FileController {
    async store(req, res) {
        const box = await BoxModel.findById(req.params.id)

        const file = await FileModel.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();