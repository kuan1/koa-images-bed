const { prefix } = require('../config')

exports.formatImages = function formatImages(list) {
  return list.map((name) => `${prefix}${name}`)
}
