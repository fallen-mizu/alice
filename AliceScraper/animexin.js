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

async function animexinUpdate() {
  try {
    const { data } = await axios.get('https://animexin.dev/');
    const $ = cheerio.load(data);
    const animeList = [];

    $('.listupd .bsx').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text();
      const url = $(element).find('a[itemprop="url"]').attr('href');
      const image = $(element).find('img[itemprop="image"]').attr('src');
      const episode = $(element).find('.eggepisode').text();
      const type = $(element).find('.eggtype').text();

      animeList.push({
        title,
        url,
        image,
        episode,
        type
      });
    });

    return animeList;
  } catch (error) {
    console.error('Error fetching updates:', error);
    return [];
  }
}

async function animexinDetail(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const episodeData = {
      title: $('h2[itemprop="partOfSeries"]').text(),
      episodeTitle: $('h2[itemprop="headline"]').text(),
      image: $('.thumb img[itemprop="image"]').attr('src'),
      rating: $('.rating strong').text(),
      status: $('.spe span:contains("Status:")').text().replace('Status: ', ''),
      network: $('.spe span:contains("Network:") a').text(),
      studio: $('.spe span:contains("Studio:") a').text(),
      released: $('.spe span:contains("Released:")').text().replace('Released: ', ''),
      duration: $('.spe span:contains("Duration:")').text().replace('Duration: ', ''),
      country: $('.spe span:contains("Country:") a').text(),
      type: $('.spe span:contains("Type:")').text().replace('Type: ', ''),
      episodes: $('.spe span:contains("Episodes:")').text().replace('Episodes: ', ''),
      fansub: $('.spe span:contains("Fansub:")').text().replace('Fansub: ', ''),
      genres: $('.genxed a').map((i, el) => $(el).text()).get(),
      description: $('.desc.mindes').text().trim(),
      downloadLinks: []
    };

    $('.mctnx .soraddlx').each((index, element) => {
      const subtitleType = $(element).find('.sorattlx h3').text();
      const links = $(element).find('.soraurlx a').map((i, el) => ({
        url: $(el).attr('href')
      })).get();

      episodeData.downloadLinks.push({
        subtitleType,
        links
      });
    });

    return JSON.stringify(episodeData, null, 2);
  } catch (error) {
    console.error('Error fetching details:', error);
    return null;
  }
}

async function animexinSearch(keyword) {
  try {
    const { data } = await axios.get('https://animexin.dev/?s=' + keyword);
    const $ = cheerio.load(data);
    
    const animeList = [];

    $('.listupd article.bs').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text();
      const url = $(element).find('a[itemprop="url"]').attr('href');
      const image = $(element).find('img[itemprop="image"]').attr('src');
      const status = $(element).find('.epx').text();
      const subtitle = $(element).find('.sb').text();
      const type = $(element).find('.typez').text();

      animeList.push({
        title,
        url,
        image,
        status,
        subtitle,
        type
      });
    });

    return JSON.stringify(animeList, null, 2);
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
}

module.exports = {
  animexinUpdate,
  animexinDetail,
  animexinSearch
};