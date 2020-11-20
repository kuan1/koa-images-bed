const fs = require('fs-extra')
const path = require('path')
const config = require('../../config')
const cache = require('../../utils/cache')
const { formatImages } = require('../../utils/util')

async function save(file) {
  const suffix = `.${file.type.split('/')[1] || 'png'}`
  const newName = file.hash + suffix
  await fs.rename(file.path, path.resolve(config.tempPath, newName))
  return newName
}

async function upload(ctx) {
  const { file } = ctx.request.files
  let res = []
  await fs.ensureDir(config.tempPath)
  if (Array.isArray(file)) {
    res = await Promise.all(file.map((item) => save(item)))
  } else {
    name = await save(file)
    res.push(name)
  }
  ctx.state.data = formatImages(res, true)
  cache.temp.clear()
}

module.exports = upload
