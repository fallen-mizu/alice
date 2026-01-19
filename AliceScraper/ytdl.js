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
const axios = require('axios')
const chalk = require('chalk')
const cheerio = require("cheerio")
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

async function yt_search(src) {
  try {
    let response = await axios.get(`https://vapis.my.id/api/yts?q=${encodeURIComponent(src)}`);
    let data = response.data.data || [];
    let result = data.map(video => ({
      url: video.url || 'Unknown',
      title: video.title || 'Tanpa Judul',
      description: video.description || '',
      videoId: video.videoId || 'Unknown',
      timestamp: video.timestamp || 'Unknown',
      duration: video.duration?.timestamp || 'Unknown',
      ago: video.ago || 'Unknown',
      views: video.views || 0,
      author: video.author?.name || 'Unknown',
      authorUrl: video.author?.url || '',
      thumbnail: video.thumbnail || video.image || 'Unknown'
    }));
    return result;
  } catch (err) {
    console.error('Terjadi kesalahan: ' + err);
    return [];
  }
}

async function Ytdl(link, qualityIndex, typeIndex) {
  const qualities = {
    audio: {
      1: '32',
      2: '64',
      3: '128',
      4: '192'
    },
    video: {
      1: '144',
      2: '240',
      3: '360',
      4: '480',
      5: '720',
      6: '1080',
      7: '1440',
      8: '2160'
    }
  };
  const headers = {
    accept: '*/*',
    referer: 'https://ytshorts.savetube.me/',
    origin: 'https://ytshorts.savetube.me/',
    'user-agent': 'Postify/1.0.0',
    'Content-Type': 'application/json'
  };
  const cdn = () => Math.floor(Math.random() * 11) + 51;
  const type = typeIndex === 1 ? 'audio' : 'video';
  const quality = qualities[type][qualityIndex];
  const cdnNumber = cdn();
  const cdnUrl = `cdn${cdnNumber}.savetube.su`;
  const videoInfoResponse = await axios.post(
    `https://${cdnUrl}/info`, {
      url: link
    }, {
      headers: {
        ...headers,
        authority: `cdn${cdnNumber}.savetube.su`
      }
    }
  );
  const videoInfo = videoInfoResponse.data.data;
  const body = {
    downloadType: type,
    quality,
    key: videoInfo.key
  };
  const downloadResponse = await axios.post(
    `https://${cdnUrl}/download`,
    body, {
      headers: {
        ...headers,
        authority: `cdn${cdnNumber}.savetube.su`
      }
    }
  );
  const downloadData = downloadResponse.data.data;
  return {
    link: downloadData.downloadUrl,
    duration: videoInfo.duration,
    durationLabel: videoInfo.durationLabel,
    fromCache: videoInfo.fromCache,
    id: videoInfo.id,
    key: videoInfo.key,
    thumbnail: videoInfo.thumbnail,
    thumbnail_formats: videoInfo.thumbnail_formats,
    title: videoInfo.title,
    titleSlug: videoInfo.titleSlug,
    videoUrl: videoInfo.url,
    quality,
    type
  };
}
 
const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];
 
const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
        throw new Error('Format nya gk support wak, coba cek lagi listnya.');
    }
 
    const config = {
        method: 'GET',
        url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };
 
    try {
        const response = await axios.request(config);
 
        if (response.data && response.data.success) {
            const { id, title, info } = response.data;
            const { image } = info;
            const downloadUrl = await ddownr.cekProgress(id);
 
            return {
                id: id,
                image: image,
                title: title,
                downloadUrl: downloadUrl
            };
        } else {
            throw new Error('Failed to fetch video details.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
        method: 'GET',
        url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };
 
    try {
        while (true) {
            const response = await axios.request(config);
 
            if (response.data && response.data.success && response.data.progress === 1000) {
                return response.data.download_url;
            }           
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }
}
module.exports = {
  Ytdl,
  yt_search,
  ddownr
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)})