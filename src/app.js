const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')

const logger = require('./middlewares/logger')
const routers = require('./routers')

const app = new Koa()

// 静态资源
const staticPath = path.join(__dirname, '../static')
app.use(koaStatic(staticPath))

// 日志
app.use(logger)

// 注册路由
app.use(routers.routes()).use(routers.allowedMethods())

module.exports = app
