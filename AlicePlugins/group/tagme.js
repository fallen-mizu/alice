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
module.exports= {
type: 'group',
command: ['tagme'],
operate: async (context) => {
const { Alice, xy, q:text, reply } = context;

let orang = (await Alice.groupMetadata(m.chat)).participants.map(u => u.jid)
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]
 Alice.sendMessage(m.chat,{text: tag},{ contextInfo: { mentionedJid }},{quoted:xy})
}
 }