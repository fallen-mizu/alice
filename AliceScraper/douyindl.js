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

const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

async function douyindl(url) {
  const postData = qs.stringify({
    q: url,
    lang: 'id',
    cftoken: ''
  });

  try {
    const response = await axios.post(
      'https://tikvideo.app/api/ajaxSearch',
      postData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': '*/*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );

    if (response.data.status === 'ok') {
      const html = response.data.data;
      const $ = cheerio.load(html);
      const results = [];

      $('.tik-video').each((i, elem) => {
        const title = $(elem).find('.thumbnail .content h3').text().trim();
        const duration = $(elem).find('.thumbnail .content p').first().text().trim();
        const thumbnail = $(elem).find('.thumbnail img').attr('src');

        const downloadLinks = [];
        $(elem).find('.dl-action a').each((j, link) => {
          downloadLinks.push({
            title: $(link).text().trim(),
            url: $(link).attr('href')
          });
        });

        results.push({ title, duration, thumbnail, downloadLinks });
      });

      return results;
    } else {
      throw new Error(`Gagal mendapatkan data: ${response.data}`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { douyindl };