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

  async function PlayStore(search) {
    try {
      const { data } = await axios.get(`https://play.google.com/store/search?q=${encodeURIComponent(search)}&c=apps`);
      
      const hasil = [];
      const $ = cheerio.load(data);
      
      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href');
        const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text();
        const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text();
        const img = $(u).find('.j2FCNc > img').attr('src');
        const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label');
        const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text();
        const link = `https://play.google.com${linkk}`;

        hasil.push({
          link: link,
          nama: nama || 'No name',
          developer: developer || 'No Developer',
          img: img || 'https://i.ibb.co/G7CrCwN/404.png',
          rate: rate || 'No Rate',
          rate2: rate2 || 'No Rate',
          link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
        });
      });

      return hasil;
    } catch (error) {
      console.error('Error fetching data from Play Store:', error);
      throw error;
    }
  }

module.exports = PlayStore;