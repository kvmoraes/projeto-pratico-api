const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { tshirtQuerySchema } = require('../middleware/validator');
const controller = require('../controllers/productController');

router.get('/tshirt', validator.query(tshirtQuerySchema), controller.getProduct)

module.exports = router