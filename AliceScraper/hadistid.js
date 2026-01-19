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

async function hadist(hadist) {
    const { data: leet } = await axios.get(`https://www.hadits.id/tentang/${hadist}`);
    const $ = cheerio.load(leet);

    let hasil = [];
    $('section').each((i, el) => {
        let judul = $(el).find('a').text().trim();
        let link = `https://www.hadits.id${$(el).find('a').attr('href')}`;
        let perawi = $(el).find('.perawi').text().trim();
        let kitab = $(el).find('cite').text().replace(perawi, '').trim();
        let teks = $(el).find('p').text().trim();

        hasil.push({ judul, link, perawi, kitab, teks });
    });

    return hasil;
}

async function detail(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('article h1').text().trim();
    const breadcrumb = [];
    $('div.breadcrumb-menu ol.breadcrumbs li').each((_, el) => {
        breadcrumb.push($(el).text().trim());
    });

    const haditsArab = $('article p.rtl').text().trim();
    const hadithNumber = $('header .hadits-about h2').text().match(/No. (\d+)/)[1];

    return { title, breadcrumb, haditsArab, hadithNumber };
}

module.exports = { hadist, detail };