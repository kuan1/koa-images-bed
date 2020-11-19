const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  port: process.env.PORT || '9301',
  imagesPath: path.resolve(__dirname, '../static/__images'),
  maxAmount: isDev ? 10 : 1000,
}
