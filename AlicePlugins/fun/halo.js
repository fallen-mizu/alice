let handler = async (m, { Alice }) => {
 await Alice.reply(m.chat, '👋 Halo! Plugin berhasil dipanggil.', m)
}

handler.help = ['halo']
handler.tags = ['fun']
handler.command = /^halo$/i

module.exports = handler