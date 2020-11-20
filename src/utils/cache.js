/**
 * 一个简单缓存
 */

let cache = []

/**
 * 获取缓存
 */
function getCache() {
  if (cache.length) return cache
  setTimeout(() => {
    cache = []
  }, 2000)
}

/**
 * 清空缓存
 */
function clearCache() {
  cache = []
}

/**
 * 设置列表缓存
 * @param {Array} newCache
 */
function setCache(newCache) {
  if (Array.isArray(newCache)) {
    cache = newCache
  }
}

module.exports = {
  get: getCache,
  set: setCache,
  clear: clearCache,
}
