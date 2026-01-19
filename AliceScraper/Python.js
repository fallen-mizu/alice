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

async function Python(text) {
    const url = 'https://api.gravitywrite.com/api/singlePrompt/contentsnew';
    const params = new URLSearchParams({
      access_token: 'MPRgSfbvscIEdOKY3307nfU5oIdva20qYDeO98SIaee3309d', // Thanks To Avosky
      prompt_id: '2008',
      tone_id: '10',
      question_461: text,
      question_449: 'python',
    });
  
    const headers = {
      'Authorization': 'Bearer MPRgSfbvscIEdOKY3307nfU5oIdva20qYDeO98SIaee3309d',
      'Accept': 'stream',
      'sec-ch-ua-platform': '"Android"',
      'app': 'MTIzfFdsd2Vi',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
      'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      'sec-ch-ua-mobile': '?1',
      'Origin': 'https://app.gravitywrite.com',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://app.gravitywrite.com/',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    };
  
    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
        headers: headers,
      });
  
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        console.error('Error in response:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Request failed:', error.message);
      return null;
    }
  }

  module.exports = Python