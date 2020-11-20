const router = require('koa-router')()
const response = require('../middlewares/response.js')

router.use(response)

// page
router.get('/', async (ctx) => {
  ctx.body = '<h1>一个简单的图床</h1>'
})

router.use('/api/upload', require('./images').routes())

module.exports = router
