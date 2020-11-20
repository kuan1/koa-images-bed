const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  port: process.env.PORT || '9301',
  imagesPath: isDev ? path.resolve(__dirname, '../__images') : '/var/www/static/images',
  maxAmount: isDev ? 10 : 1000,
  prefix: 'https://www.luzhongkuan.cn/static/images/',
}
