const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../controller')
const config = require('../config')

const FOUR_M = 20 * 1024 * 1024

const bodyOptions = {
  multipart: true,
  formidable: {
    maxFieldsSize: FOUR_M,
    uploadDir: config.imagesPath,
    keepExtensions: true,
    hash: 'md5',
  },
}

router.get('/images', controller.images.list)
router.post('/images', koaBody(bodyOptions), controller.images.upload)
router.delete('/images', controller.images.remove)

router.get('/temp', controller.temp.list)
router.post('/temp', koaBody(bodyOptions), controller.temp.upload)
router.delete('/temp', controller.temp.remove)

module.exports = router
