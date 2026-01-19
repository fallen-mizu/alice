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
const vm = require('vm');

function DouyinSearchPage() {
    this.baseURL = 'https://so.douyin.com/';
    this.defaultParams = {
        search_entrance: 'aweme',
        enter_method: 'normal_search',
        innerWidth: '431',
        innerHeight: '814',
        reloadNavStart: String(Date.now()),
        is_no_width_reload: '1',
        keyword: '',
    };
    this.cookies = {};

    this.api = axios.create({
        baseURL: this.baseURL,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'id-ID,id;q=0.9',
            'referer': 'https://so.douyin.com/',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        }
    });

    this.api.interceptors.response.use(res => {
        const setCookies = res.headers['set-cookie'];
        if (setCookies) {
            setCookies.forEach(c => {
                const [name, value] = c.split(';')[0].split('=');
                if (name && value) this.cookies[name] = value;
            });
        }
        return res;
    });

    this.api.interceptors.request.use(config => {
        if (Object.keys(this.cookies).length) {
            config.headers['Cookie'] = Object.entries(this.cookies).map(([k, v]) => `${k}=${v}`).join('; ');
        }
        return config;
    });
}

DouyinSearchPage.prototype.initialize = async function () {
    try {
        await this.api.get('/');
        return true;
    } catch {
        return false;
    }
}

DouyinSearchPage.prototype.search = async function ({ query }) {
    try {
        await this.initialize();
        const params = { ...this.defaultParams, keyword: query, reloadNavStart: String(Date.now()) };
        const res = await this.api.get('s', { params });
        const html = res.data;
        const $ = cheerio.load(html);

        let scriptWithData = '';
        $('script').each((_, el) => {
            const text = $(el).html();
            if (text.includes('let data =') && text.includes('"business_data":')) {
                scriptWithData = text;
            }
        });

        if (!scriptWithData) {
            throw new Error('Script containing data not found.');
        }

        const match = scriptWithData.match(/let\s+data\s*=\s*(\{[\s\S]+?\});/);
        if (!match) {
            throw new Error('Unable to match data object.');
        }

        const dataCode = `data = ${match[1]}`;
        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(dataCode, sandbox);

        const fullData = sandbox.data;
        const data = fullData?.business_data;

        if (!data) {
            throw new Error('Not found.');
        }

        const awemeInfos = fullData?.business_data
            ?.map(entry => entry?.data?.aweme_info)
            .filter(Boolean);

        return awemeInfos;

    } catch (e) {
        throw e;
    }
}

module.exports = { DouyinSearchPage };