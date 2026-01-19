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
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const qs = require('qs');

const tool = [ 'removebg', 'enhance', 'upscale', 'restore', 'colorize' ];

const pxpic = {
 upload: async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const fileName = Date.now() + "." + ext;

  const folder = "uploads";
  const responsej = await axios.post("https://pxpic.com/getSignedUrl", { folder, fileName }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { presignedUrl } = responsej.data;

  await axios.put(presignedUrl, buffer, {
    headers: {
      "Content-Type": mime,
    },
  });

  const cdnDomain = "https://files.fotoenhancer.com/uploads/";
  const sourceFileUrl = cdnDomain + fileName;

  return sourceFileUrl;
  },
  create: async (filePath, tools) => {
    if (!tool.includes(tools)) { 
        return `Pilih salah satu dari tools ini: ${tool.join(', ')}`; 
    }
    const url = await pxpic.upload(filePath);
    let data = qs.stringify({
      'imageUrl': url,
      'targetFormat': 'png',
      'needCompress': 'no',
      'imageQuality': '100',
      'compressLevel': '6',
      'fileOriginalExtension': 'png',
      'aiFunction': tools,
      'upscalingLevel': ''
    });

    let config = {
      method: 'POST',
      url: 'https://pxpic.com/callAiFunction',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept-language': 'id-ID'
      },
      data: data
    };

    const api = await axios.request(config);
    return api.data;
  }
}

module.exports = { pxpic }