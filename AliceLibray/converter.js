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
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn("ffmpeg", [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)})
