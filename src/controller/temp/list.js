const path = require('path')
const fs = require('fs-extra')
const cache = require('../../utils/cache')
const { tempPath } = require('../../config')
const config = require('../../config')
const { formatImages } = require('../../utils/util')

async function getFilesInfo(paths) {
  const res = []
  for (let i = 0; i < paths.length; i++) {
    const stat = await fs.stat(path.resolve(config.tempPath, paths[i]))
    res.push({
      name: paths[i],
      mtimeMs: stat.mtimeMs,
    })
  }
  res.sort((a, b) => b.mtimeMs - a.mtimeMs)
  return res
}

async function limitFileAmount(infos) {
  if (infos.length <= config.maxAmount) return
  const removeFiles = infos.slice(config.maxAmount)
  for (let i = 0; i < removeFiles.length; i++) {
    await fs.remove(path.resolve(config.tempPath, removeFiles[i].name))
  }
}

async function list(ctx) {
  const cacheImages = cache.temp.get() || []
  let images = []
  let cached = 0
  if (cacheImages.length) {
    images = cacheImages
    cached = 1
  } else {
    await fs.ensureDir(tempPath)
    const res = await fs.readdir(tempPath)
    const infos = await getFilesInfo(res)
    limitFileAmount(infos)
    images = formatImages(
      infos.map((item) => item.name),
      true
    )
    cache.temp.set(images)
  }

  const { page = 1, size = 20 } = ctx.query

  ctx.state.data = {
    list: images.slice((page - 1) * size, page * size),
    cached,
    total: images.length,
  }
}

module.exports = list
