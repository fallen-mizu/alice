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

const portfolioPath = './AliceSystem/AliceDatabase/Game/crypto.json';
const alertPath = './AliceSystem/AliceDatabase/Game/alert.json';
const watchlistPath = './AliceSystem/AliceDatabase/Game/watchlist.json';

if (!fs.existsSync(portfolioPath)) fs.writeFileSync(portfolioPath, '{}');
if (!fs.existsSync(alertPath)) fs.writeFileSync(alertPath, '{}');
if (!fs.existsSync(watchlistPath)) fs.writeFileSync(watchlistPath, '{}');

const getCoinPrice = async (coin) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: { ids: coin, vs_currencies: 'usd' }
    });
    return res.data[coin]?.usd || null;
  } catch {
    return null;
  }
};

const formatUSD = (num) => `$${parseFloat(num).toLocaleString()}`;

module.exports = async function (m, command, args, AliceReply) {
  const sender = m.sender;
  const [cmd, coin, value] = [args[0], args[1]?.toLowerCase(), args[2]];

  let portfolio = JSON.parse(fs.readFileSync(portfolioPath));
  let alertData = JSON.parse(fs.readFileSync(alertPath));
  let watchlist = JSON.parse(fs.readFileSync(watchlistPath));

  switch (cmd) {
    case undefined:
      return AliceReply(`*🪙 CRYPTO MENU*\n\n• .crypto price <coin>\n• .crypto buy <coin> <amount>\n• .crypto sell <coin> <amount>\n• .crypto portfolio\n• .crypto alert <coin> <price>\n• .crypto watchlist\n• .crypto watchadd <coin>\n• .crypto watchdel <coin>`);

    case 'price':
      if (!coin) return AliceReply('Contoh: .crypto price btc');
      const price = await getCoinPrice(coin);
      if (!price) return AliceReply('Koin tidak ditemukan.');
      return AliceReply(`💸 Harga *${coin.toUpperCase()}* sekarang: ${formatUSD(price)}`);

    case 'buy':
      if (!coin || isNaN(value)) return AliceReply('Contoh: .crypto buy btc 100');
      const buyPrice = await getCoinPrice(coin);
      if (!buyPrice) return AliceReply('Koin tidak ditemukan.');
      const amountBuy = parseFloat(value) / buyPrice;

      if (!portfolio[sender]) portfolio[sender] = {};
      if (!portfolio[sender][coin]) portfolio[sender][coin] = 0;
      portfolio[sender][coin] += amountBuy;

      fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2));
      return AliceReply(`✅ Membeli *${amountBuy.toFixed(6)} ${coin.toUpperCase()}* senilai ${formatUSD(value)}`);

    case 'sell':
      if (!coin || isNaN(value)) return AliceReply('Contoh: .crypto sell btc 100');
      if (!portfolio[sender] || !portfolio[sender][coin]) return AliceReply('Kamu belum punya koin ini.');
      const sellPrice = await getCoinPrice(coin);
      const amountSell = parseFloat(value) / sellPrice;
      if (portfolio[sender][coin] < amountSell) return AliceReply('Jumlah koin tidak cukup.');
      portfolio[sender][coin] -= amountSell;
      if (portfolio[sender][coin] <= 0) delete portfolio[sender][coin];

      fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2));
      return AliceReply(`✅ Menjual *${amountSell.toFixed(6)} ${coin.toUpperCase()}* senilai ${formatUSD(value)}`);

    case 'portfolio':
      const userData = portfolio[sender];
      if (!userData || Object.keys(userData).length === 0) return AliceReply('📭 Portofoliomu kosong.');
      let teks = '*📊 PORTOFOLIO KAMU:*\n';
      let total = 0;

      for (let [koin, jumlah] of Object.entries(userData)) {
        const p = await getCoinPrice(koin);
        const val = jumlah * p;
        teks += `• ${koin.toUpperCase()}: ${jumlah.toFixed(6)} (${formatUSD(val)})\n`;
        total += val;
      }
      teks += `\n💰 Total: *${formatUSD(total)}*`;
      return AliceReply(teks);

    case 'alert':
      if (!coin || isNaN(value)) return AliceReply('Contoh: .crypto alert btc 50000');
      if (!alertData[sender]) alertData[sender] = [];
      alertData[sender].push({ coin, price: parseFloat(value) });

      fs.writeFileSync(alertPath, JSON.stringify(alertData, null, 2));
      return AliceReply(`⏰ Alert dibuat! Kamu akan diberi tahu saat ${coin.toUpperCase()} menyentuh ${formatUSD(value)}`);

    case 'watchlist':
      const list = watchlist[sender] || [];
      if (list.length === 0) return AliceReply('📭 Watchlist kosong.');
      return AliceReply(`👁️ Watchlist kamu:\n- ${list.map(v => v.toUpperCase()).join('\n- ')}`);

    case 'watchadd':
      if (!coin) return AliceReply('Contoh: .crypto watchadd btc');
      if (!watchlist[sender]) watchlist[sender] = [];
      if (watchlist[sender].includes(coin)) return AliceReply('Sudah ada di watchlist.');
      watchlist[sender].push(coin);

      fs.writeFileSync(watchlistPath, JSON.stringify(watchlist, null, 2));
      return AliceReply(`✅ ${coin.toUpperCase()} ditambahkan ke watchlist.`);

    case 'watchdel':
      if (!coin || !watchlist[sender]) return AliceReply('Contoh: .crypto watchdel btc');
      watchlist[sender] = watchlist[sender].filter(v => v !== coin);
      fs.writeFileSync(watchlistPath, JSON.stringify(watchlist, null, 2));
      return AliceReply(`🗑️ ${coin.toUpperCase()} dihapus dari watchlist.`);

    default:
      return AliceReply('Perintah tidak dikenali. Ketik *.crypto* untuk menu.');
  }
};