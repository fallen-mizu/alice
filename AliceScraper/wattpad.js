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

const wattpad = {
  search: async (query) => {
    const baseUrl = "https://www.wattpad.com";
    const url = `${baseUrl}/search/${query}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = $("section#section-results-stories article#results-stories ul.list-group li.list-group-item")
      .map((index, element) => ({
        link: baseUrl + $(element).find(".story-card").attr("href"),
        image: $(element).find(".cover img").attr("src"),
        title: $(element).find('.story-info .title[aria-hidden="true"]').first().text().trim(),
        readCount: $(element).find(".new-story-stats .stats-value").eq(0).text(),
        voteCount: $(element).find(".new-story-stats .stats-value").eq(1).text(),
        chapterCount: $(element).find(".new-story-stats .stats-value").eq(2).text(),
        description: $(element).find(".description").text().trim(),
      })).get();
    return results;
  },
  read: async function read(url, page = 1, output = "\n\n", prevTitle = null) {
    const pageURL = `${url}/page/${page}`;
    const response = await fetch(pageURL);
    const html = await response.text();
    const $ = cheerio.load(html);
    const newTitle = $("title").text();

    if (newTitle === prevTitle) {
      const nextURL = $("a.on-navigate.next-up").attr("href");
      if (!nextURL) return output;
      return read(nextURL, 1, output + `\n\n\t${prevTitle}\n`, null);
    }
    $("p").each((index, element) => {
      const paragraph = $(element).text().trim();
      output += `${paragraph}\n`;
    });
    return read(url, page + 1, output, newTitle);
  },
  getList: async function getList(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const startReadingLink = $("a.read-btn").attr("href");
      const listUrl = "https://www.wattpad.com" + startReadingLink;
      const episode = await wattpad.list(listUrl);
      return episode;
    } catch (error) {
      throw new Error("Error fetching data:", error);
    }
  },
  list: async function list(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const tableOfContents = $('ul.table-of-contents li[class=""]')
        .map((index, element) => ({
          title: $(element).find(".part-title").text().trim(),
          link:
            "https://www.wattpad.com" +
            $(element).find("a.on-navigate").attr("href"),
        }))
        .get();
      return tableOfContents;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
};

module.exports = { wattpad };