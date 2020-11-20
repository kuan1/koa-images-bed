const { prefix, tempPrefix } = require('../config')

exports.formatImages = function formatImages(list = [], isTemp = false) {
  return list.map((name) => `${isTemp ? tempPrefix : prefix}${name}`)
}
