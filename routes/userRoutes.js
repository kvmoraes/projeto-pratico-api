const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { defaultQuerySchema, userDefaultBodySchema, userParamsSchema } = require('../middleware/validator');
const controller = require('../controllers/userController');



router.get('/users', validator.query(defaultQuerySchema), controller.getUser)
router.post('/users', validator.body(userDefaultBodySchema), controller.createUser)
router.put('/users', validator.body(userDefaultBodySchema), controller.updateUser)
router.delete('/users/:id', validator.params(userParamsSchema), controller.deleteUser)


module.exports = router;