const fs = require('fs-extra')
const path = require('path')
const config = require('../../config')
const cache = require('../../utils/cache')
const { formatImages } = require('../../utils/util')

async function save(file) {
  const suffix = `.${file.type.split('/')[1] || 'png'}`.replace('jpeg', 'jpg')
  const newName = file.hash + suffix
  await fs.rename(file.path, path.resolve(config.imagesPath, newName))
  return newName
}

async function upload(ctx) {
  const { file } = ctx.request.files
  await fs.ensureDir(config.imagesPath)
  let res = []
  if (Array.isArray(file)) {
    res = await Promise.all(file.map((item) => save(item)))
  } else {
    name = await save(file)
    res.push(name)
  }
  ctx.state.data = formatImages(res)
  cache.images.clear()
}

module.exports = upload
