const { sendMarkdown: sendError } = require('../utils/ding')

module.exports = async function (ctx, next) {
  try {
    await next()
    const { code, data = {}, info, error } = ctx.state
    ctx.body = ctx.body || {
      success: !code,
      data,
      info: info || error,
    }
  } catch (e) {
    // catch 住全局的错误信息
    console.error('Catch Error: %o', e)
    const info = e && e.message ? e.message : e.toString()

    if (e.status) ctx.status = e.status

    ctx.body = {
      success: false,
      info,
    }

    // 发送错误报告
    sendError(
      '图床错误',
      JSON.stringify(
        {
          error: info,
          url: `来源：${ctx.headers.referer}，接口：${ctx.url}`,
          status: ctx.status,
        },
        null,
        2
      )
    )
  }
}
