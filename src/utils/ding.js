const Ding = require('@luzhongk/node-ding')

const ding = new Ding({
  access_token: 'addc88e7fdd25f7757b2afe31ca029c1c4f995511831fd195d72619db486e0b6',
  secret: 'addc88e7fdd25f7757b2afe31ca029c1c4f995511831fd195d72619db486e0b6',
})

/**
 * @description:自定义发送
 * @param {data} Object
 * @return:
 */
async function send(data) {
  return ding.send(data)
}

/**
 * @description: 发送markdown
 * @param {type}
 * @return:
 */
async function sendMarkdown(title, text) {
  const data = {
    msgtype: 'markdown',
    markdown: {
      title,
      text: `### ${title}\n${text}`,
    },
  }
  return send(data)
}

module.exports = {
  ding,
  sendMarkdown,
}
