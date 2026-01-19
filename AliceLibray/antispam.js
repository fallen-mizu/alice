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
const toMs = require('ms')

// Anti spam titik (dot) untuk WhatsApp (Baileys)
// Deteksi: jumlah titik berlebih, run "....", rasio titik tinggi, dan command bertitik berulang.

class AntiSpamDots {
  constructor({
    enabled = true,
    maxDots = 12,
    maxDotRun = 4,
    maxDotRatio = 0.4,
    windowMs = 10_000,
    maxSuspiciousMsgs = 2,
  } = {}) {
    this.enabled = enabled;
    this.cfg = { maxDots, maxDotRun, maxDotRatio, windowMs, maxSuspiciousMsgs };
    this.state = new Map(); // userId -> { times: number[], count: number }
  }

  setEnabled(v) { this.enabled = !!v; }
  toggle() { this.enabled = !this.enabled; return this.enabled; }

  isSuspiciousText(text = "") {
    if (!text) return false;
    const dots = (text.match(/\./g) || []).length;
    if (dots >= this.cfg.maxDots) return true;
    if (new RegExp(`\\.{${this.cfg.maxDotRun},}`).test(text)) return true;
    const ratio = dots / Math.max(text.length, 1);
    if (ratio >= this.cfg.maxDotRatio) return true;
    // pola ".help .help .help"
    if (/(\.[a-z0-9_-]{1,20}\b[\s]*){3,}/i.test(text)) return true;
    return false;
  }

  _bump(userId, suspicious) {
    const now = Date.now();
    const rec = this.state.get(userId) || { times: [], count: 0 };
    const cutoff = now - this.cfg.windowMs;
    rec.times = rec.times.filter(t => t >= cutoff);
    if (suspicious) rec.count += 1;
    else rec.count = Math.max(0, rec.count - 1);
    rec.times.push(now);
    this.state.set(userId, rec);
    return rec;
  }

  shouldBlock(userId, text) {
    if (!this.enabled) return false;
    const suspicious = this.isSuspiciousText(text);
    const rec = this._bump(userId, suspicious);
    return suspicious && rec.count >= this.cfg.maxSuspiciousMsgs;
  }
}

// Ekspor instance tunggal supaya state konsisten di seluruh handler
const DotGuard = new AntiSpamDots();
module.exports = { AntiSpamDots, DotGuard };