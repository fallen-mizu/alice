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
const axios = require('axios');
const cheerio = require('cheerio');
module.exports = {
 type: 'anime',
 command: ['zerochan','zrc','zero'],
 operate: async (context) => {
const { Alice, m, text, q, prefix, command, reply, xy, limituser, limitAbis, useLimit, registered, IsReg } = context;

const zerochan = {
 mode1: async (query) => {
 try {
 const { data } = await axios.get(`https://www.zerochan.net/search?q=${query}`);
 const $ = cheerio.load(data);
 const statistic = [];
 $('#children-types li a').each((index, element) => {
 const label = $(element).text().trim();
 const count = $(element).find('span').text().trim();
 statistic.push({ label, count });
 });

 const characters = [];
 $('#children-grid li').each((index, element) => {
 const baseUrl = 'https://www.zerochan.net';
 const characterName = $(element).find('p.character b a').text().trim();
 const characterText = $(element).find('p.character').text();
 const characterCountMatch = characterText.match(/Character (\d+)/);
 const characterCount = characterCountMatch ? characterCountMatch[1] : '0';
 const backgroundImageStyle = $('.thumb').css('background-image');
 const characterImage = backgroundImageStyle.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
 const characterUrl = baseUrl + $(element).find('a.thumb').attr('href');

 characters.push({
 name: characterName,
 count: characterCount,
 imageUrl: characterImage,
 url: characterUrl
 });
 });

 return {
 statistic,
 characters
 };
 } catch (error) {
 console.error("Error:", error.response ? error.response.data : error.message);
 return { success: false, message: error.message };
 }
 },
 mode2: async (query) => {
 try {
 const { data } = await axios.get('https://www.zerochan.net/search?q=' + query);
 const $ = cheerio.load(data);
 const characterDetails = $('.bb').text().trim();
 const seriesTags = [];
 $('#tags li a').each((index, element) => {
 seriesTags.push($(element).text().trim());
 });
 const images = [];
 $('.thumb img').each((index, element) => {
 images.push($(element).attr('data-src'));
 });
 const totalImages = $('#tabs li:first-child span').text().trim();
 const strictModeCount = $('#tabs li:nth-child(2) span').text().trim();
 const characterCount = $('#tabs li:nth-child(3) span').text().trim();
 const characterName = $('h1 span').text().trim();

 return {
 name: characterName,
 desc: characterDetails || 'no description',
 series_tags: seriesTags,
 all_images: images,
 statistic: {
 images: totalImages,
 strict_modes: strictModeCount,
 total_characters: characterCount
 }
 };
 } catch (error) {
 console.error("Error:", error.response ? error.response.data : error.message);
 return { success: false, message: error.message };
 }
 },
 search: async (query) => {
 try {
 const mode1Result = await zerochan.mode1(query);
 if (mode1Result.characters.length > 0) {
 return mode1Result;
 } else {
 console.log('⛔ Gak ada hasil pake mode1 berarti pake mode2, wet i am search kan.....');
 return await zerochan.mode2(query);
 }
 } catch (error) {
 console.error("Error:", error.response ? error.response.data : error.message);
 return { success: false, message: error.message };
 }
 }
};

if (!text) return reply("nama karakter anime yang ingin anda cari")
reply(mess.wait)
const zerochanft = await zerochan.search(text)

let capt = `╭──── *[ ᴢᴇʀᴏᴄʜᴀɴ ]* ──々\n`
capt += `│ =〆 ɴᴀᴍᴇ : ${zerochanft.name}\n`
capt += `│ =〆 ᴅᴇsᴄ : ${zerochanft.desc}\n`

let no = 1
for (let i of zerochanft.series_tags) {
capt += `│ =〆 ʜᴀsᴛᴀɢ${no++}: ${i}\n`
}
capt += `╰─々`

let res = await zerochanft.all_images[Math.floor(zerochanft.all_images.length * Math.random())]
await Alice.sendMessage(m.chat, {
image: {
url: res
},
caption: capt,
contextInfo: {
mentionedJid: [m.sender], 
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channel,
newsletterName: `Zerochan By: ${ownername}`,
serverMessageId: 143
}
}
}, { quoted: xy })
}
}