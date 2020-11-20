const fs = require('fs-extra')
const cache = require("./cache")
const { imagesPath } = require('../config')

export function getImages() {
  const cacheImages = cache.get() || []
  if (cacheImages.length) return cacheImages
  await fs.ensureDir(imagesPath)
  const res = await fs.readdir(imagesPath)
  return res
}

export function formatImages(list) {
  return list.map((name) => `https://www.luzhongkuan.cn/static/images/${name}`)
}