const express = require('express');
const multer = require('multer');
const multerConfig = require('../configs/multer');

const router = express.Router();

const BoxController = require('../controllers/BoxController');
const FileController = require('../controllers/FileController');

router.post('/boxes', BoxController.store);
router.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);
router.get('/boxes/:id', BoxController.show);

module.exports = router; 