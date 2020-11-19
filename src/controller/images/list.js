const fs = require('fs-extra')
const cache = require('../../utils/cache')
const { imagesPath } = require('../../config')

async function list(ctx) {
  const cacheImages = cache.get() || []
  if (cacheImages.length) {
    return (ctx.state.data = { list: cacheImages, cache: 1 })
  }
  await fs.ensureDir(imagesPath)
  const res = await fs.readdir(imagesPath)
  cache.set(res)
  ctx.state.data = { list: res }
}

module.exports = list
