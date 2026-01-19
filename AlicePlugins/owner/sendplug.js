//————————————————————————//

/*

Base XyrooRynzz
Powered By Alice Assistent
© XyrooRynzz 2022 - 2026

Source
WhatsApp : https://wa.me/6281543496975
Tele me : https://t.me/XyrooRynzz
instagram : https://instagram.com/biionlyyone
WhatsApp: https://whatsapp.com/channel/0029VaagYHwCnA82hDK7l31D

*/

//————————————————————————//
let fs = require('fs')

module.exports = {
	type: 'owner',
	command: ['sendplug'],
	operate: async (context) => {
		const {
			Alice,
			m,
			q: text,
			prefix,
			command,
            args,
			reply
		} = context;
	if (!q) return reply(`*Example*: ${prefix + command} @tag/number tools/tagme.js`)
	let who;
				try {
if (!isOwner) return reply('owner')				
				if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender } catch (err) {
				if (m.isGroup) who = args[0] + "@s.whatsapp.net"
				}
				if (!who) return reply(`tag/number ! ! !`)
				if (!args[1]) return reply(`plugin (name)`)

 const isValid = await Alice.onWhatsApp(q + "@s.whatsapp.net");
 	if (isValid.length == 0) {
	 	return reply("Number not in whatsapp!");
 	}
				var user_bot = await fs.readFileSync(`./Plugins/${args[1]}.js`)
				Alice.sendMessage(who, {
					document: user_bot,
					caption: '© Xyroo Rynzz: ' + ' `'+args[1]+'`',
					mimetype: 'document/application',
					fileName: `${args[1]}`
				})
reply('Success sending file to :' + args[0])
}}