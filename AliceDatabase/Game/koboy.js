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
const koboyDBPath = './AliceSystem/AliceDatabase/Game/koboy.json';
if (!fs.existsSync(koboyDBPath)) fs.writeFileSync(koboyDBPath, '{}');

function misiBaru() {
  const daftar = [
    { jenis: 'kerja', teks: 'Kerja 1 kali', target: 1 },
    { jenis: 'tembak', teks: 'Menang duel 1 kali', target: 1 },
    { jenis: 'beli', teks: 'Beli item di toko', target: 1 },
    { jenis: 'kirim', teks: 'Kirim item ke pemain lain', target: 1 }
  ];
  return daftar[Math.floor(Math.random() * daftar.length)];
}

function buatTokoHarian() {
  return ['pistol kayu', 'pistol besi', 'shotgun', 'peluru', 'armor'];
}

function rollDadu() {
  return Math.floor(Math.random() * 6) + 1;
}

module.exports = async function koboyHandler(m, command, args, AliceReply, db) {
console.log('Koboy handler dipanggil dengan sub:', args[0]);
  const koboyData = JSON.parse(fs.readFileSync(koboyDBPath));
  const user = m.sender;

if (!koboyData[user]) {
  koboyData[user] = {
    nama: m.pushName,
    role: 'Koboy',
    uang: 500,
    bank: 0,
    exp: 0,
    daily: null,
    level: 1,
    senjata: 'Pistol Kayu',
    wanted: false,
    inventori: [],
    kills: 0,
    pasar: [],
    kapasitas: 10, // default kapasitas
    itemKhusus: [], // ← koma ditambahkan di sini
    investasi: { jumlah: 0, waktu: null },
    statistik: {
      kerja: 0,
      duelMenang: 0,
      misiSelesai: 0
    },
    misi: {
      terakhir: null,
      status: 'belum',
      jenis: null,
      progress: 0,
      target: 1
    }
  };
}

  const userData = koboyData[user];
  const sub = args[0] ? args[0].toLowerCase() : 'status';
  console.log('[KOBOY]', sub); // Tepat di bawah const sub = args[0]...
  // Level up otomatis
const levelUpExp = userData.level * 100;
while (userData.exp >= levelUpExp) {
  userData.exp -= levelUpExp;
  userData.level += 1;

  let hadiah = `🎉 *Level Up!* Sekarang level ${userData.level}`;

  // 🎁 Bonus uang level 15
  if (userData.level === 15) {
    userData.uang += 1000;
    hadiah += `\n🎁 Bonus: 💰 1000!`;
  }

  // 🎭 Unlock role otomatis
  if (userData.level === 10 && userData.role === 'Koboy') {
    userData.role = 'Bandit';
    hadiah += `\n🎯 Role berubah jadi *Bandit*!`;
  }
  if (userData.level === 20 && userData.role === 'Bandit') {
    userData.role = 'Sheriff';
    hadiah += `\n👑 Kamu sekarang jadi *Sheriff*!`;
  }

  AliceReply(hadiah);
}

  // Daftar item toko
const shop = {
  'pistol kayu': 0,
  'pistol besi': 500,
  'shotgun': 1500,
  'armor': 1000,
  'peluru': 100,
  'tas besar': 800,
  'medkit': 300,
  'kuda': 1000
};

  switch (sub) {
    case 'daftar':
      AliceReply('🤠 Kamu sudah terdaftar sebagai koboy!');
      break;

case 'status':
  const nextExp = userData.level * 100;
  AliceReply(
    `🤠 *STATUS KOBOY*\n` +
    `Nama: ${userData.nama}\n` +
    `Peran: ${userData.role}\n` +
    `Level: ${userData.level} (EXP: ${userData.exp}/${nextExp})\n` +
    `Uang: 💰 ${userData.uang}\n` +
    `Bank: 🏦 ${userData.bank}\n` +
    `Senjata: ${userData.senjata}\n` +
    `Wanted: ${userData.wanted ? '🚨 IYA' : '❌ TIDAK'}\n` +
    `Inventori: ${(userData.inventori || []).join(', ') || 'Kosong'}`
  );
  break;

    case 'kerja':
      const hasilKerja = Math.floor(Math.random() * 100) + 50;
      userData.uang += hasilKerja;
      userData.exp += 5;
      
      if (userData.misi?.jenis === 'kerja' && userData.misi.status === 'proses') {
  userData.misi.progress += 1;
}
      
      AliceReply(`💼 Kamu bekerja dan mendapatkan 💰 ${hasilKerja}`);
      break;

case 'tembak': {
      if (!m.mentionedJid[0]) return AliceReply('🚨 Tag pemain yang ingin ditembak!');
      const target = m.mentionedJid[0];
      if (!koboyData[target]) return AliceReply('❌ Target belum daftar sebagai koboy.');

      if (!userData.inventori.includes('peluru')) return AliceReply('🔫 Kamu kehabisan peluru!');
      
      const senjata = userData.senjata?.toLowerCase();
      let damage = 10; // default
      if (senjata.includes('besi')) damage = 25;
      else if (senjata.includes('shotgun')) damage = 40;

      // kurangi peluru
      const peluruIndex = userData.inventori.indexOf('peluru');
      if (peluruIndex !== -1) userData.inventori.splice(peluruIndex, 1);

      const targetData = koboyData[target];
      let targetArmor = targetData.inventori.includes('armor');
      let finalDamage = targetArmor ? Math.floor(damage / 2) : damage;

      // Penentu menang: peluang + senjata + reputasi
      let chance = 0.5;
      if (userData.role === 'bandit' && targetData.role === 'sheriff') chance -= 0.2;
      if (senjata.includes('besi')) chance += 0.1;
      if (senjata.includes('shotgun')) chance += 0.15;

      const menang = Math.random() < chance;

      if (menang) {
        const curian = Math.min(100, targetData.uang);
        userData.exp += finalDamage;
        userData.uang += curian;
        targetData.uang -= curian;

        if (userData.misi?.jenis === 'tembak' && userData.misi.status === 'proses') {
          userData.misi.progress += 1;
        }

        AliceReply(`🔫 Kamu menang duel!\n- Damage: ${finalDamage}\n- Ambil 💰 ${curian}\n- EXP +${finalDamage}`);
      } else {
        userData.uang = Math.max(0, userData.uang - 100);
        AliceReply(`💥 Kamu kalah duel! Kehilangan 💰 100 dan 1 peluru.`);
      }
      break;
    }

case 'beli':
  const itemBeli = args.slice(1).join(' ').toLowerCase();
  const stokHariIni = buatTokoHarian();

  if (!shop[itemBeli] || !stokHariIni.includes(itemBeli)) {
    return AliceReply('❌ Item tidak tersedia di toko.\nTersedia: ' + stokHariIni.join(', '));
  }

  const harga = shop[itemBeli];
  if (userData.uang < harga) return AliceReply('💸 Uang kamu tidak cukup!');

  // ✅ Tambahkan ini sebelum item masuk inventori
  if (userData.inventori.length >= userData.kapasitas)
    return AliceReply('🎒 Tas kamu penuh! Tingkatkan kapasitas atau jual item.');

  userData.uang -= harga;
  userData.inventori.push(itemBeli);

  // Efek khusus item tas besar
  if (itemBeli === 'tas besar') {
    userData.kapasitas += 5;
    AliceReply(`🎒 Kamu membeli *tas besar*! Kapasitas inventori bertambah jadi ${userData.kapasitas} slot.`);
  } else {
    AliceReply(`🛒 Kamu membeli *${itemBeli}* seharga 💰 ${harga}`);
  }

  // Cek misi beli
  if (userData.misi?.jenis === 'beli' && userData.misi.status === 'proses') {
    userData.misi.progress += 1;
  }
  break;

    case 'jual':
      const itemJual = args.slice(1).join(' ').toLowerCase();
      if (!userData.inventori.includes(itemJual)) return AliceReply('❌ Kamu tidak punya item itu.');
      const jualHarga = Math.floor(shop[itemJual] / 2);
      userData.uang += jualHarga;
      userData.inventori = userData.inventori.filter(i => i !== itemJual);
      AliceReply(`💵 Kamu menjual *${itemJual}* seharga 💰 ${jualHarga}`);
      break;

    case 'skill':
      let skill = '⚡ *Skill Role:*\n';
      switch (userData.role.toLowerCase()) {
        case 'koboy':
          skill += '- +10% peluang menang duel\n- Bisa kerja cari uang\n';
          break;
        case 'bandit':
          skill += '- Bisa merampok\n- +15% keuntungan tembak\n';
          break;
        case 'sheriff':
          skill += '- Bisa tangkap bandit\n- Dapat bonus uang dari tangkapan\n';
          break;
        default:
          skill += 'Belum ada skill.';
      }
      AliceReply(skill);
      break;

    case 'wanted':
      if (userData.role.toLowerCase() !== 'bandit') return AliceReply('❌ Hanya Bandit bisa jadi Wanted.');
      userData.wanted = true;
      AliceReply(`🚨 Kamu sekarang WANTED! Hati-hati jika bertemu Sheriff!`);
      break;

    case 'top':
    case 'topkoboy':
      const top = Object.entries(koboyData)
        .sort((a, b) => b[1].uang - a[1].uang)
        .slice(0, 5)
        .map(([id, data], i) => `*${i + 1}. ${data.nama}* - 💰${data.uang}`)
        .join('\n') || 'Belum ada data';
      AliceReply(`🏆 Top 5 Koboy Kaya:\n\n${top}`);
      break;

    case 'peran':
      AliceReply('👤 Peran kamu saat ini: ' + userData.role);
      break;
      
    case 'tangkap':
      if (userData.role.toLowerCase() !== 'sheriff') return AliceReply('❌ Hanya Sheriff yang bisa menangkap!');
      if (!m.mentionedJid[0]) return AliceReply('🚨 Tag pemain yang ingin ditangkap!');
      const targetTangkap = m.mentionedJid[0];
      if (!koboyData[targetTangkap]) return AliceReply('❌ Target belum terdaftar.');
      if (!koboyData[targetTangkap].wanted) return AliceReply('✅ Target bukan bandit yang dicari.');

      // Hadiah penangkapan
      userData.uang += 300;
      koboyData[targetTangkap].wanted = false;
      AliceReply(`🪤 Kamu menangkap ${koboyData[targetTangkap].nama}! Dapat 💰 300`);
      break;

    case 'lepas':
      if (userData.role.toLowerCase() !== 'sheriff') return AliceReply('❌ Hanya Sheriff yang bisa melepas tahanan!');
      if (!m.mentionedJid[0]) return AliceReply('🚨 Tag pemain yang ingin dilepas!');
      const targetLepas = m.mentionedJid[0];
      if (!koboyData[targetLepas]) return AliceReply('❌ Target belum terdaftar.');
      koboyData[targetLepas].wanted = false;
      AliceReply(`🔓 Kamu melepaskan ${koboyData[targetLepas].nama} dari status wanted.`);
      break;

    case 'hukum':
      if (userData.role.toLowerCase() !== 'sheriff') return AliceReply('❌ Hanya Sheriff yang bisa menghukum!');
      if (!m.mentionedJid[0]) return AliceReply('🚨 Tag pemain yang ingin dihukum!');
      const targetHukum = m.mentionedJid[0];
      if (!koboyData[targetHukum]) return AliceReply('❌ Target belum terdaftar.');
      if (!koboyData[targetHukum].wanted) return AliceReply('✅ Target bukan bandit yang dicari.');

      // Hukum bandit: kurangi uang + exp
      koboyData[targetHukum].uang = Math.max(0, koboyData[targetHukum].uang - 200);
      koboyData[targetHukum].exp = Math.max(0, koboyData[targetHukum].exp - 20);
      koboyData[targetHukum].wanted = false;
      AliceReply(`⚖️ ${koboyData[targetHukum].nama} dihukum! Kehilangan 💰200 dan EXP 20`);
      break;
      
case 'misi':
      const now = new Date().toDateString();

      if (!userData.misi || userData.misi.terakhir !== now) {
        const misi = misiBaru(); // fungsi di atas
        userData.misi = {
          terakhir: now,
          status: 'proses',
          jenis: misi.jenis,
          teks: misi.teks,
          progress: 0,
          target: misi.target,
        };
        return AliceReply(`🎯 Misi harian kamu:\n${misi.teks}\n\nGunakan kembali *.koboy misi* untuk cek progres.`);
      }

      if (userData.misi.status === 'selesai') {
        return AliceReply('✅ Kamu sudah menyelesaikan misi hari ini.');
      }

      if (userData.misi.progress >= userData.misi.target) {
        const hadiahUang = 200;
        const hadiahExp = 25;
        userData.uang += hadiahUang;
        userData.exp += hadiahExp;
        userData.misi.status = 'selesai';
        return AliceReply(`📜 Misi selesai!\n+💰 ${hadiahUang}\n+📘 EXP ${hadiahExp}`);
      }

      return AliceReply(`📊 Progres Misi:\n${userData.misi.teks}\n${userData.misi.progress}/${userData.misi.target}`);
      
       
      case 'kirim':
      const itemKirim = args[1]?.toLowerCase();
      const targetKirim = m.mentionedJid[0];
      if (!itemKirim || !targetKirim) return AliceReply('🔁 Format: .koboy kirim [item] @user');

      if (!userData.inventori.includes(itemKirim)) return AliceReply('❌ Kamu tidak punya item itu!');
      if (!koboyData[targetKirim]) return AliceReply('❌ Target belum terdaftar.');

      koboyData[targetKirim].inventori.push(itemKirim);
      userData.inventori = userData.inventori.filter(i => i !== itemKirim);
if (userData.misi?.jenis === 'kirim' && userData.misi.status === 'proses') {
  userData.misi.progress += 1;
}
      AliceReply(`📦 Item *${itemKirim}* berhasil dikirim ke ${koboyData[targetKirim].nama}`);
      break;
      
      case 'rank':
      const topExp = Object.entries(koboyData)
        .sort((a, b) => b[1].exp - a[1].exp)
        .slice(0, 5)
        .map(([id, data], i) => `*${i + 1}. ${data.nama}* - EXP: ${data.exp}, Kill: ${data.kills}`)
        .join('\n') || 'Data kosong.';
      AliceReply(`🎖️ *Top EXP & Kill*\n\n${topExp}`);
      break;

case 'kota':
      const tempat = args[1] ? args[1].toLowerCase() : '';

      if (!tempat) {
        return AliceReply(
          `🏙️ Selamat datang di Kota Koboy!\n` +
          `Ketik: .koboy kota [tempat]\n\n` +
          `Tempat yang tersedia:\n` +
          `🏦 bank - Simpan/ambil uang\n` +
          `🍺 saloon - Isi darah dan minum\n` +
          `🛒 toko - Belanja senjata & item\n` +
          `🧾 penjara - Lihat daftar bandit\n` +
          `👮 sheriff - Info kantor sheriff`
        );
      }

      switch (tempat) {
        case 'bank':
          AliceReply('🏦 *BANK KOBOY*\nGunakan: .koboy setor [jumlah] atau .koboy tarik [jumlah]');
          break;
        case 'saloon':
          AliceReply('🍺 *SALOON KOBOKU*\nButuh minum? Belum ada fitur minum. Segera hadir!');
          break;
      case 'toko': {
          let stokHariIni = buatTokoHarian();
          AliceReply('🛒 *TOKO DINAMIS*\nGunakan: .koboy beli [item]\n\nStok hari ini:\n' + stokHariIni.        map(i => `- ${i}`).join('\n'));
          break;
        }
        case 'penjara':
          const wantedList = Object.entries(koboyData)
            .filter(([id, data]) => data.wanted)
            .map(([id, data], i) => `👤 ${data.nama} - 💰 ${data.uang}`)
            .join('\n') || 'Tidak ada bandit wanted.';
          AliceReply(`🧾 *DAFTAR BURONAN*\n\n${wantedList}`);
          break;
        case 'sheriff':
          AliceReply('👮 *KANTOR SHERIFF*\nKamu bisa gunakan .koboy tangkap atau .koboy hukum untuk menangani bandit!');
          break;
        default:
          AliceReply('❌ Tempat tidak ditemukan. Gunakan: .koboy kota');
      }
      break;      
      
case 'setor':
      const jumlahSetor = parseInt(args[1]);
      if (!jumlahSetor || isNaN(jumlahSetor)) return AliceReply('💰 Masukkan jumlah uang yang ingin disetor!\nContoh: .koboy setor 100');
      if (jumlahSetor > userData.uang) return AliceReply('💸 Uang kamu tidak cukup!');
      userData.uang -= jumlahSetor;
      userData.bank += jumlahSetor;
      AliceReply(`🏦 Kamu menyetor 💰 ${jumlahSetor} ke bank.`);
      break;
      
            
case 'tarik':
      const jumlahTarik = parseInt(args[1]);
      if (!jumlahTarik || isNaN(jumlahTarik)) return AliceReply('💰 Masukkan jumlah uang yang ingin ditarik!\nContoh: .koboy tarik 100');
      if (jumlahTarik > userData.bank) return AliceReply('🏦 Uang di bank tidak cukup!');
      userData.bank -= jumlahTarik;
      userData.uang += jumlahTarik;
      AliceReply(`💸 Kamu menarik 💰 ${jumlahTarik} dari bank.`);
      break;

case 'cekstok': {
  const stokHariIni = buatTokoHarian();
  AliceReply('🛒 Stok toko hari ini:\n' + stokHariIni.join(', '));
  break;
}

case 'rampok':
  if (userData.role.toLowerCase() !== 'bandit') return AliceReply('❌ Hanya Bandit yang bisa merampok!');
  if (!m.mentionedJid[0]) return AliceReply('🚨 Tag pemain yang ingin dirampok!');
  const targetRampok = m.mentionedJid[0];
  if (!koboyData[targetRampok]) return AliceReply('❌ Target belum terdaftar.');

  const targetDataRampok = koboyData[targetRampok];
  if (targetDataRampok.uang < 100) return AliceReply('💸 Target terlalu miskin, tidak bisa dirampok.');

  const sukses = Math.random() < 0.5; // 50% peluang sukses
  if (sukses) {
    const hasilRampok = Math.min(200, targetDataRampok.uang);
    targetDataRampok.uang -= hasilRampok;
    userData.uang += hasilRampok;
    userData.exp += 10;
    AliceReply(`🏴‍☠️ Kamu berhasil merampok ${targetDataRampok.nama} dan mendapatkan 💰 ${hasilRampok}!`);
  } else {
    userData.uang = Math.max(0, userData.uang - 150);
    userData.wanted = true;
    AliceReply('💥 Rampokan gagal! Kamu ketahuan dan kehilangan 💰150.\n🚨 Sekarang kamu jadi *WANTED*!');
  }
  break;

case 'equip': {
      const itemEquip = args.slice(1).join(' ').toLowerCase();
      if (!itemEquip) return AliceReply('⚙️ Format: .koboy equip [item]');
      if (!userData.inventori.includes(itemEquip)) return AliceReply('❌ Kamu tidak memiliki item tersebut!');

      if (itemEquip.includes('pistol') || itemEquip.includes('shotgun')) {
        userData.senjata = itemEquip;
        return AliceReply(`🔫 Senjata kamu sekarang: *${itemEquip}*`);
      }
     if (itemEquip === 'armor') {
  return AliceReply('🛡️ Armor tidak perlu di-equip, otomatis aktif jika kamu memilikinya.');
}
      return AliceReply('❌ Item tidak bisa dipasang/equip.');
    }
  break;

case 'daily':
  const today = new Date().toDateString();
  if (userData.daily === today) return AliceReply('📆 Kamu sudah klaim bonus hari ini!');

  const bonusUang = 150;
  const bonusExp = 15;

  userData.daily = today;
  userData.uang += bonusUang;
  userData.exp += bonusExp;

  AliceReply(`🎁 Bonus harian diklaim!\n+💰 ${bonusUang} uang\n+📘 ${bonusExp} EXP`);
  break;
  
case 'minum':
  const hargaMinum = 50;
  if (userData.uang < hargaMinum) return AliceReply('🍺 Uang kamu kurang! Minuman harganya 💰 50');

  userData.uang -= hargaMinum;
  const bonus = Math.floor(Math.random() * 10) + 5;
  userData.exp += bonus;

  AliceReply(`🍻 Kamu menikmati minuman di saloon.\n+📘 ${bonus} EXP, -💰 50`);
  break;
  
case 'kerja_berani':
  const suksess = Math.random() < 0.6;
  if (suksess) {
    const hasil = Math.floor(Math.random() * 200) + 100;
    userData.uang += hasil;
    userData.exp += 10;
    AliceReply(`💼 Kerja berani sukses! Kamu dapat 💰 ${hasil} dan 📘 10 EXP`);
  } else {
    const rugi = Math.floor(Math.random() * 100) + 50;
    userData.uang = Math.max(0, userData.uang - rugi);
    AliceReply(`💥 Kerja gagal total! Kamu rugi 💰 ${rugi}`);
  }
  break;

case 'invest':
  const jumlahInvest = parseInt(args[1]);
  if (!jumlahInvest || isNaN(jumlahInvest)) return AliceReply('💼 Masukkan jumlah uang untuk investasi!\nContoh: .koboy invest 100');
  if (jumlahInvest > userData.uang) return AliceReply('💸 Uang kamu tidak cukup!');

  userData.uang -= jumlahInvest;
  userData.investasi = {
    jumlah: jumlahInvest,
    waktu: Date.now()
  };
  AliceReply(`🏦 Kamu menginvestasikan 💰 ${jumlahInvest}.\nGunakan *.koboy cair* setelah 24 jam untuk ambil hasil.`);
  break;

case 'cair':
  if (!userData.investasi || userData.investasi.jumlah <= 0) return AliceReply('❌ Kamu tidak punya investasi aktif.');

  const nowTime = Date.now();
  const durasi = nowTime - userData.investasi.waktu;
  const satuHari = 24 * 60 * 60 * 1000;

  if (durasi < satuHari) {
    const sisaJam = Math.ceil((satuHari - durasi) / (60 * 60 * 1000));
    return AliceReply(`⏳ Investasi belum matang. Tunggu sekitar ${sisaJam} jam lagi.`);
  }

  const hasill = Math.floor(userData.investasi.jumlah * 1.5);
  userData.uang += hasill;
  userData.investasi = { jumlah: 0, waktu: null };
  AliceReply(`💰 Investasi cair! Kamu dapat ${hasill}`);
  break;

case 'tebak':
  const angkaTebakan = parseInt(args[1]);
  if (!angkaTebakan || isNaN(angkaTebakan) || angkaTebakan < 1 || angkaTebakan > 5) {
    return AliceReply('🎲 Masukkan angka antara 1 sampai 5\nContoh: .koboy tebak 3');
  }

  const angkaBenar = Math.floor(Math.random() * 5) + 1;
  if (angkaTebakan === angkaBenar) {
    const hadiah = 200;
    userData.uang += hadiah;
    userData.exp += 10;
    AliceReply(`🎯 Benar! Angka: ${angkaBenar}\n+💰 ${hadiah} uang\n+📘 10 EXP`);
  } else {
    const rugi = 50;
    userData.uang = Math.max(0, userData.uang - rugi);
    AliceReply(`❌ Salah! Angka yang benar: ${angkaBenar}\n-💰 ${rugi}`);
  }
  break;
  
case 'level':
  const nextLevelExp = userData.level * 100;
  const persen = Math.floor((userData.exp / nextLevelExp) * 100);
  AliceReply(
    `📘 *Level Kamu: ${userData.level}*\n` +
    `EXP: ${userData.exp}/${nextLevelExp} (${persen}%)\n` +
    `Ketik .koboy kerja, .koboy duel, atau .koboy misi untuk menambah EXP!`
  );
  break; 
  
case 'help':
  AliceReply(
`🤠 *Koboy Game Help Menu*

📦 Bantuan
• .koboy help-role
• .koboy help-ekonomi
• .koboy help-perang
• .koboy help-tempat
• .koboy help-ranking

📜 *Dasar Pemula:*
• .koboy daftar — Daftar sebagai koboy
• .koboy status — Lihat status pemain
• .koboy level — Cek EXP & Level
• .koboy skill — Lihat skill berdasarkan role
• .koboy helprole — Bantuan sesuai role kamu
• .koboy kota — Masuk ke lokasi kota
• .koboy cekstok — Cek stok toko hari ini

📈 *Ranking & Statistik:*
• .koboy top — Top 5 pemain terkaya
• .koboy rank — Top EXP & Kill
• .koboy leveltop — Top Level pemain

💼 *Pekerjaan & Misi:*
• .koboy kerja — Kerja biasa (💰 +EXP)
• .koboy kerja_berani — Risiko tinggi, hadiah besar
• .koboy misi — Ambil/cek misi harian
• .koboy daily — Klaim bonus harian

🛍️ *Toko & Barang:*
• .koboy beli [item] — Beli item di toko
• .koboy jual [item] — Jual item dari inventori
• .koboy equip [item] — Pasang senjata
• .koboy kirim [item] @user — Kirim item ke pemain lain

🔫 *Pertarungan & Kejahatan:*
• .koboy tembak @user — Duel dengan pemain lain
• .koboy roll @user — Adu dadu PVP
• .koboy wanted — Jadi buronan (khusus Bandit)
• .koboy rampok @user — Rampok pemain (khusus Bandit)

👮 *Perintah Khusus Sheriff:*
• .koboy tangkap @user — Tangkap bandit wanted
• .koboy hukum @user — Hukum bandit (uang & EXP berkurang)
• .koboy lepas @user — Bebaskan pemain dari wanted

🏦 *Bank & Investasi:*
• .koboy setor [jumlah] — Setor uang ke bank
• .koboy tarik [jumlah] — Tarik uang dari bank
• .koboy invest [jumlah] — Investasi 24 jam
• .koboy cair — Ambil hasil investasi

🍻 *Tempat & Mini Game:*
• .koboy minum — Minum di saloon (EXP +)
• .koboy tebak [1-5] — Tebak angka & menang hadiah
• .koboy kota [lokasi] — Masuk ke tempat: bank, toko, sheriff, saloon, penjara

📝 *Tips:*
• EXP didapat dari kerja, tembak, minum, dan misi
• Naik level = bonus uang dan perubahan role
• Gunakan .koboy helprole untuk lihat skill khusus peran

Contoh: 
.koboy kerja
.koboy beli peluru
.koboy tembak @user
.koboy kota toko
`
  );
  break;
        
case 'help-role': {
  const role = userData.role.toLowerCase();

  const umum = [
    '📜 .koboy status',
    '💼 .koboy kerja',
    '💼 .koboy kerja_berani',
    '🎯 .koboy misi',
    '🎁 .koboy daily',
    '🛒 .koboy beli [item]',
    '💸 .koboy jual [item]',
    '📦 .koboy kirim [item] @user',
    '🏦 .koboy setor [jumlah]',
    '🏦 .koboy tarik [jumlah]',
    '🏙️ .koboy kota',
    '🛠️ .koboy equip [item]',
    '📘 .koboy level',
    '📈 .koboy rank',
    '🏆 .koboy top',
    '🎲 .koboy tebak [1-5]',
    '🍺 .koboy minum',
    '📈 .koboy invest [jumlah]',
    '📈 .koboy cair',
    '🛒 .koboy cekstok',
    '🔎 .koboy skill',
    '🔫 .koboy tembak @user',
    '🎲 .koboy roll @user'
  ];

  let khusus = [];

  if (role === 'bandit') {
    khusus = [
      '💣 .koboy rampok @user — Rampok pemain',
      '🚨 .koboy wanted — Jadi buronan'
    ];
  } else if (role === 'sheriff') {
    khusus = [
      '🪤 .koboy tangkap @user — Tangkap bandit',
      '⚖️ .koboy hukum @user — Hukum bandit',
      '🔓 .koboy lepas @user — Bebaskan pemain dari wanted'
    ];
  }

  AliceReply(
`🎭 *Menu Per Role: ${userData.role.toUpperCase()}*

📌 *Umum:*
${umum.map(i => '• ' + i).join('\n')}

${
  khusus.length > 0
    ? `\n🧬 *Khusus ${userData.role}:*\n` + khusus.map(i => '• ' + i).join('\n')
    : ''
}`
  );
  break;
}


case 'help-ekonomi':
  AliceReply(
`💰 *Bantuan Ekonomi & Inventori:*

🛒 *Toko & Inventori:*
• .koboy beli [item] — Beli item
• .koboy jual [item] — Jual item
• .koboy equip [item] — Pasang senjata
• .koboy kirim [item] @user — Kirim item ke pemain lain
• .koboy cekstok — Cek stok toko

🏦 *Bank & Uang:*
• .koboy setor [jumlah] — Simpan uang ke bank
• .koboy tarik [jumlah] — Ambil uang dari bank
• .koboy invest [jumlah] — Investasi harian
• .koboy cair — Ambil hasil investasi

💼 *Pekerjaan & Misi:*
• .koboy kerja — Kerja harian
• .koboy kerja_berani — Hadiah besar, risiko tinggi
• .koboy misi — Misi harian (hadiah)
• .koboy daily — Bonus harian`
  );
  break;

case 'help-perang':
  AliceReply(
`🔫 *Bantuan Perang, Duel & Kejahatan:*

🎯 *Duel & PVP:*
• .koboy tembak @user — Duel pistol
• .koboy roll @user — Adu dadu PVP

☠️ *Bandit (khusus role Bandit):*
• .koboy wanted — Jadi buronan
• .koboy rampok @user — Rampok pemain

👮 *Sheriff (khusus role Sheriff):*
• .koboy tangkap @user — Tangkap bandit
• .koboy hukum @user — Hukum bandit
• .koboy lepas @user — Bebaskan dari wanted`
  );
  break;

case 'help-tempat':
  AliceReply(
`🏙️ *Bantuan Lokasi & Kota:*

• .koboy kota — Lihat lokasi tersedia
• .koboy kota bank — Info setor & tarik uang
• .koboy kota toko — Belanja item senjata
• .koboy kota saloon — Minum & healing EXP
• .koboy kota penjara — Lihat daftar bandit wanted
• .koboy kota sheriff — Info fitur Sheriff

🎲 *Mini Game:*
• .koboy tebak [1-5] — Tebak angka, dapat hadiah
• .koboy minum — Minum di saloon (EXP +)`
  );
  break;

case 'help-ranking':
  AliceReply(
`🏆 *Bantuan Ranking & Statistik:*

• .koboy top — Top 5 pemain terkaya
• .koboy rank — Ranking EXP & Kill
• .koboy leveltop — Ranking Level Tertinggi`
  );
  break;

case 'leveltop':
case 'toplevel':
  const topLevel = Object.entries(koboyData)
    .sort((a, b) => b[1].level - a[1].level || b[1].exp - a[1].exp)
    .slice(0, 5)
    .map(([id, data], i) => `*${i + 1}. ${data.nama}* - Level ${data.level} (EXP: ${data.exp})`)
    .join('\n') || 'Belum ada data.';
  AliceReply(`🏆 *Top Level Koboy*\n\n${topLevel}`);
  break;     

case 'roll': {
  const target = m.mentionedJid[0];
  if (!target) return AliceReply('🎲 Tag pemain yang ingin diajak adu dadu!');
  if (!koboyData[target]) return AliceReply('❌ Target belum terdaftar sebagai koboy.');
  const lawanData = koboyData[target];

  const daduUser = rollDadu();
  const daduLawan = rollDadu();
  let pesan = `🎲 PVP Roll!
${userData.nama}: ${daduUser}
${lawanData.nama}: ${daduLawan}\n`;

  if (daduUser > daduLawan) {
    userData.kills++;
    userData.exp += 10;
    pesan += `🎉 ${userData.nama} menang! +10 EXP`;
  } else if (daduLawan > daduUser) {
    lawanData.kills++;
    lawanData.exp += 10;
    pesan += `🎉 ${lawanData.nama} menang! +10 EXP`;
  } else {
    pesan += `🤝 Seri! Tidak ada yang menang.`;
  }
  AliceReply(pesan);
  fs.writeFileSync(koboyDBPath, JSON.stringify(koboyData, null, 2));
  return;
}
break

case 'jualke': {
  const item = args[1]?.toLowerCase();
  const harga = parseInt(args[2]);
  const targetJual = m.mentionedJid[0];

  if (!item || !harga || !targetJual)
    return AliceReply(`📦 Format: .koboy jualke [item] [harga] @user\nContoh: .koboy jualke peluru 150 @target`);

  if (!userData.inventori.includes(item))
    return AliceReply(`❌ Kamu tidak punya item *${item}*`);

  if (!koboyData[targetJual])
    return AliceReply(`🚫 Target belum terdaftar.`);

  if (!koboyData[targetJual].pasar) koboyData[targetJual].pasar = [];

  // Simpan tawaran ke "pasar" user tujuan
  koboyData[targetJual].pasar.push({
    dari: user,
    nama: userData.nama,
    item,
    harga
  });

  // Kurangi item dari penjual (sementara)
  userData.inventori = userData.inventori.filter(i => i !== item);

  AliceReply(`📬 Kamu menawarkan *${item}* seharga 💰${harga} ke ${koboyData[targetJual].nama}.\nMereka bisa membelinya dengan .koboy beliitem ${item} @${user.split('@')[0]}`);
  break;
}

case 'pasarku': {
  if (!userData.pasar || userData.pasar.length === 0) {
    return AliceReply('📭 Tidak ada tawaran jual item ke kamu saat ini.');
  }

  let list = '🛒 *Tawaran Masuk:*\n\n';
  userData.pasar.forEach((tawaran, i) => {
    list += `${i + 1}. *${tawaran.item}* seharga 💰${tawaran.harga} dari *${tawaran.nama}*\n`;
    list += `👉 .koboy beliitem ${tawaran.item} @${tawaran.dari.split('@')[0]}\n\n`;
  });

  AliceReply(list.trim());
  break;
}
    
                                                                
case 'beliitem': {
  const itemBeli = args[1]?.toLowerCase();
  const penjual = m.mentionedJid[0];
  if (!itemBeli || !penjual) return AliceReply('🛒 Format: .koboy beliitem [item] @penjual');

  if (!koboyData[penjual]) return AliceReply('❌ Penjual tidak terdaftar.');
  const penjualData = koboyData[penjual];

  const tawaran = penjualData?.tawaranku?.find(t => t.item === itemBeli && t.kepada === user);
  if (!tawaran) return AliceReply('❌ Penjual tidak menawarkan item itu ke kamu.');

  if (userData.uang < tawaran.harga) return AliceReply('💸 Uang kamu tidak cukup untuk membeli item ini.');

  // Proses transaksi
  userData.uang -= tawaran.harga;
  penjualData.uang += tawaran.harga;
  userData.inventori.push(itemBeli);

  // Hapus dari daftar pasar masing-masing
  penjualData.tawaranku = penjualData.tawaranku.filter(t => !(t.item === itemBeli && t.kepada === user));
  userData.pasar = userData.pasar.filter(t => !(t.item === itemBeli && t.dari === penjual));

  AliceReply(`✅ Kamu membeli *${itemBeli}* dari ${penjualData.nama} seharga 💰 ${tawaran.harga}`);
  break;
}

case 'bataljual': {
  const itemBatal = args.slice(1).join(' ').toLowerCase();
  if (!itemBatal) return AliceReply('⚠️ Format: .koboy bataljual [item]');

  const daftar = userData.tawaranku || [];
  const tawaran = daftar.find(t => t.item === itemBatal);

  if (!tawaran) return AliceReply('❌ Kamu tidak sedang menawarkan item itu.');

  // Hapus dari tawaran penjual
  userData.tawaranku = daftar.filter(t => t.item !== itemBatal);

  // Hapus juga dari daftar pembeli yang dituju
  const target = tawaran.kepada;
  if (koboyData[target] && Array.isArray(koboyData[target].pasar)) {
    koboyData[target].pasar = koboyData[target].pasar.filter(t => t.item !== itemBatal || t.dari !== user);
  }

  AliceReply(`✅ Penawaran *${itemBatal}* telah dibatalkan.`);
  break;
}

    default:
      AliceReply(`⚠️ Sub-command tidak ditemukan.\nContoh: .koboy kerja, .koboy beli pistol, .koboy wanted`);
  }

fs.writeFileSync(koboyDBPath, JSON.stringify(koboyData, null, 2));
};