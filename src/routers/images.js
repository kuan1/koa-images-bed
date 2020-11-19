const router = require('koa-router')()
const controller = require('../controller')

//
router.get('/upload', controller.images.list)
router.post('/upload', controller.images.upload)
router.delete('/upload', controller.images.remove)

module.exports = router
