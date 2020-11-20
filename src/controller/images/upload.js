const fs = require('fs-extra')
const path = require('path')
const config = require('../../config')
const cache = require('../../utils/cache')
const { formatImages } = require('../../utils/util')

async function save(file) {
  const newName = file.hash + file.name.substr(file.name.lastIndexOf('.'))
  await fs.rename(file.path, path.resolve(config.imagesPath, newName))
  return newName
}

async function upload(ctx) {
  const { file } = ctx.request.files
  let res = []
  if (Array.isArray(file)) {
    res = await Promise.all(file.map((item) => save(item)))
  } else {
    name = await save(file)
    res.push(name)
  }
  ctx.state.data = formatImages(res)
  cache.clear()
}

module.exports = upload
