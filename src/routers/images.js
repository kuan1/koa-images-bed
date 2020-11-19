const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../controller')
const config = require('../config')

const FOUR_M = 20 * 1024 * 1024

router.get('/upload', controller.images.list)

router.post(
  '/upload',
  koaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: FOUR_M,
      uploadDir: config.imagesPath,
      keepExtensions: true,
      hash: 'md5',
    },
  }),
  controller.images.upload
)
router.delete('/upload', controller.images.remove)

module.exports = router
