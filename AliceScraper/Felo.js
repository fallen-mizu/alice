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
const { v4: uuidv4 } = require('uuid');

const Felo = async (query) => {
  const headers = {
    "Accept": "*/*",
    "User-Agent": "Postify/1.0.0",
    "Content-Encoding": "gzip, deflate, br, zstd",
    "Content-Type": "application/json",
  };

  const payload = {
    query,
    search_uuid: uuidv4().replace(/-/g, ''),
    search_options: { langcode: "id-MM" },
    search_video: true,
  };

  const parseResult = (responseText) => {
    const result = { answer: '', source: [] };
    responseText.split('\n').forEach(line => {
      if (line.startsWith('data:')) {
        try {
          const data = JSON.parse(line.slice(5).trim());
          if (data.data) {
            if (data.data.text) {
              result.answer = data.data.text.replace(/\[\d+\]/g, '');
            }
            if (data.data.sources) {
              result.source = data.data.sources;
            }
          }
        } catch (e) {
          console.error("Error parsing line:", e);
        }
      }
    });
    return result;
  };

  try {
    const response = await axios.post("https://api.felo.ai/search/threads", payload, {
      headers,
      timeout: 30000,
      responseType: 'text',
    });

    return parseResult(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { error: "Failed to fetch data from Felo API" };
  }
};

module.exports = { Felo };