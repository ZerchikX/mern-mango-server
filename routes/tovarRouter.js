const Router = require('express')
const router = new Router()
const TovarController = require('../controllers/tovarController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', TovarController.create)
router.get('/', TovarController.getAll)
router.get('/:id', TovarController.getOne)

module.exports = router
