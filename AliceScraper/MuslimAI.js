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

async function muslimai(query) {
    const searchUrl = 'https://www.muslimai.io/api/search'; // Thanks To ShannModerz
    const answerUrl = 'https://www.muslimai.io/api/answer';

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const searchResponse = await axios.post(searchUrl, { query }, { headers });

        if (!searchResponse.data || searchResponse.data.length === 0) {
            return { error: "Maaf, tidak ditemukan jawaban yang relevan." };
        }

        const sources = searchResponse.data.map(item => ({
            title: item.title || "Tidak ada judul",
            url: item.url || "Tidak ada URL"
        }));

        const passages = searchResponse.data.map(item => item.content).join('\n\n');

        const answerData = {
            prompt: `Gunakan ayat-ayat berikut untuk menjawab pertanyaan dengan sebaik mungkin sebagai ahli Al-Qur'an kelas dunia. Jangan menyebutkan bahwa Anda diberikan referensi ayat dalam jawaban Anda:\n\n${query}\n\n${passages}`
        };

        const answerResponse = await axios.post(answerUrl, answerData, { headers });

        return {
            answer: answerResponse.data,
            sources
        };
    } catch (error) {
        console.error("Error MuslimAI:", error.response ? error.response.data : error.message);
        return { error: "Terjadi kesalahan saat mengambil data dari MuslimAI." };
    }
}

module.exports = { muslimai };