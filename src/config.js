const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  port: process.env.PORT || '9301',
  imagesPath: isDev ? path.resolve(__dirname, '../__images') : '/var/www/static/images',
  tempPath: isDev ? path.resolve(__dirname, '../__temp') : '/var/www/static/temp',
  maxAmount: isDev ? 10 : 1000,
  prefix: 'https://www.luzhongkuan.cn/static/images/',
  tempPrefix: 'https://www.luzhongkuan.cn/static/temp/',
}
