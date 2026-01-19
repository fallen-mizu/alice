//═══════════════════════════════════════════════//
//           🚀 Alice Assistent - Bot WhatsApp Canggih           //
//═══════════════════════════════════════════════//
//
//   🤖 Powered By XyrooRynzz
//   © XyrooRynzz 2022 - 2026
//
//   📌 Source & Official Contact:
//   ➤ Telegram : t.me/XyrooRynzz
//   ➤ Gmail    : xyroorynzz@gmail.com
//   ➤ Github   : github.com/xyroorynzz
//
//   📢 Telegram Channels:
//   ➤ Utama : t.me/xyrooinformations
//   ➤ Testi : t.me/xyrootestimoni
//
//───────────────────────────────────────────────//
// 📖 PANDUAN MEMBACA FILE README.MD
//───────────────────────────────────────────────//
//
//   📂 File readme.md berisi panduan lengkap:
//   • Cara menjalankan script Alice Assistent
//   • Aturan & informasi penting
//   • File yang boleh/tidak boleh diubah
//   • Kontak & promo resmi dari XyrooRynzz
//
//   💡 Cara membacanya:
//   1. Buka panel / file manager kalian
//   2. Masuk ke direktori utama script
//   3. Klik file "readme.md"
//   4. Pilih "View" atau "Edit" untuk melihat isi panduan
//
//   🧠 Disarankan membaca readme.md terlebih dahulu
//   sebelum menjalankan atau mengedit script.
//
//───────────────────────────────────────────────//
//
//   ⚡ Fast • Secure • Automated • Stylish ⚡
//
//═══════════════════════════════════════════════//
//
// 📈━━━━━━━━━━━━━━━━━━━ [ © XyrooRynzz ] ━━━━━━━━━━━━━━━━━━━📉//
const axios = require('axios')
const chalk = require('chalk')
const cheerio = require("cheerio")
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')


async function remini(imageData, action) {
  return new Promise(async (resolve, reject) => {
    let actions = ['enhance', 'recolor', 'dehaze'];
    if (!actions.includes(action)) {
      action = actions[0];
    }

    let formData = new FormData();
    let url = `https://inferenceengine.vyro.ai/${action}`;

    formData.append('model_version', 1, {
      'Content-Transfer-Encoding': 'binary',
      'contentType': 'multipart/form-data; charset=uttf-8'
    });

    formData.append('image', Buffer.from(imageData), {
      'filename': 'enhance_image_body.jpg',
      'contentType': 'image/jpeg'
    });

    formData.submit({
      'url': url,
      'host': 'inferenceengine.vyro.ai',
      'path': `/${action}`,
      'protocol': 'https:',
      'headers': {
        'User-Agent': 'okhttp/4.9.3',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
      }
    }, function (err, res) {
      if (err) {
        reject();
        return;
      }

      let chunks = [];
      res.on('data', chunk => {
        chunks.push(chunk);
      }).on('end', () => {
        resolve(Buffer.concat(chunks));
      }).on('error', () => {
        reject();
      });
    });
  });
}

async function upScale(path, client, m, chatId) {
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(path));
    form.append("scale", 2);

    const headers = {
      ...form.getHeaders()
    };

    const { data } = await axios.post("https://api2.pixelcut.app/image/upscale/v1", form, { headers, responseType: 'arraybuffer' });

    await client.sendMessage(chatId, { image: Buffer.from(data) }, {quoted: m})
  } catch (error) {
    console.error(error);
  }
}

const fromBuffer = require('file-type')

async function FotoEnhance(path) {
  const buffer = fs.readFileSync(path)
  const fileInfo = await fromBuffer(buffer)
  const ext = fileInfo?.ext || 'bin'
  const mime = fileInfo?.mime || 'application/octet-stream'
  const fileName = Math.random().toString(36).slice(2, 8)+'.'+ext

  const responses = await axios.post("https://pxpic.com/getSignedUrl", {
    folder: "uploads",
    fileName
  }, {
    headers: { "Content-Type": "application/json" }
  })

  await axios.put(responses.data.presignedUrl, buffer, {
    headers: { "Content-Type": mime }
  })

  return 'https://files.fotoenhancer.com/uploads/'+fileName
}

async function Pxpic(path, func) {
  const tool = ['removebg', 'enhance', 'upscale', 'restore', 'colorize']
  if (!tool.includes(func)) return `Tersedia: ${tool.join(', ')}`

  const buffer = fs.readFileSync(path)
  const fileInfo = await fromBuffer(buffer)
  const ext = fileInfo?.ext || 'bin'
  const mime = fileInfo?.mime || 'application/octet-stream'
  const fileName = Math.random().toString(36).slice(2, 8)+'.'+ext

  const { data } = await axios.post("https://pxpic.com/getSignedUrl", {
    folder: "uploads",
    fileName
  }, { headers: { "Content-Type": "application/json" } })

  await axios.put(data.presignedUrl, buffer, { headers: { "Content-Type": mime } })
  const url = "https://files.fotoenhancer.com/uploads/"+fileName

  const api = await axios.post("https://pxpic.com/callAiFunction", new URLSearchParams({
    imageUrl: url,
    targetFormat: 'png',
    needCompress: 'no',
    imageQuality: '100',
    compressLevel: '6',
    fileOriginalExtension: 'png',
    aiFunction: func,
    upscalingLevel: ''
  }).toString(), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept-language': 'id-ID'
    }
  })

  return api.data
}

module.exports = {
  remini,
  upScale,
  Pxpic,
  FotoEnhance
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)})