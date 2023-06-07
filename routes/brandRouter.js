const Router = require('express')
const router = new Router()
const brandRouter = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', brandRouter.create)
router.get('/', brandRouter.getAll)

module.exports = router
