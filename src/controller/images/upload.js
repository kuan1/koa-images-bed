const fs = require('fs-extra')
const path = require('path')
const config = require('../../config')
const cache = require('../../utils/cache')

async function save(file) {
  const newName = file.hash + file.name.substr(file.name.lastIndexOf('.'))
  await fs.rename(file.path, path.resolve(config.imagesPath, newName))
}

async function upload(ctx) {
  const { file } = ctx.request.files
  if (Array.isArray(file)) {
    file.forEach((item) => save(item))
  } else {
    save(file)
  }
  ctx.state.data = '上传成功'
  cache.clear()
}

module.exports = upload
