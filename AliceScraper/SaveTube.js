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

const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },
    
    headers: {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },
    
    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },
    
    checkQuality(type, qualityIndex) {
        if (!(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },
    
    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };
 
        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },
    
    async dl(link, qualityIndex, typeIndex) {
        const type = typeIndex === 1 ? 'audio' : 'video';
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;
        
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };
 
        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);
 
        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};

module.exports = { SaveTube };