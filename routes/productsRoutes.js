const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { tshirtQuerySchema, tshirtBodySchema } = require('../middleware/validator');
const controller = require('../controllers/productController');

router.get('/tshirt', validator.query(tshirtQuerySchema), controller.getProduct)
router.post('/tshirt', validator.body(tshirtBodySchema), controller.createProduct)
router.put('/tshirt', validator.body(tshirtBodySchema), controller.updateProduct)
router.delete('/tshirt/:id', validator.params(tshirtQuerySchema), controller.deleteProduct)

module.exports = router