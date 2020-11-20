const path = require('path')
const fs = require('fs-extra')
const config = require('../../config')
const cache = require('../../utils/cache')

async function remove(ctx) {
  const { names } = ctx.request.query
  const namesArr = names.split(',')
  for (let i = 0; i < namesArr.length; i++) {
    const filePath = path.resolve(config.imagesPath, namesArr[i])
    const isExist = await fs.pathExists(filePath)
    if (isExist) {
      await fs.remove(filePath)
    }
  }
  ctx.state.data = namesArr
  cache.clear()
}

module.exports = remove
