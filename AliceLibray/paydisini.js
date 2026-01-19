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
const axios = require("axios");
const FormData = require("form-data");
const crypto = require("crypto");

function generateUniqueCode(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

const createQR = async (apiKey, amount, validTime) => {
  try {
    const uniqueCode = generateUniqueCode(10);
    const payload = {
      key: apiKey,
      request: "new",
      unique_code: uniqueCode,
      service: "11",
      amount: amount,
      note: "Pembayaran",
      valid_time: validTime,
      type_fee: "1",
      signature: crypto
        .createHash("md5")
        .update(
          apiKey + uniqueCode + "11" + amount + validTime + "NewTransaction",
        )
        .digest("hex"),
    };

    const data = new URLSearchParams(Object.entries(payload));

    const response = await axios.post("https://paydisini.co.id/api/", data);
    console.log("createQR:", response.data)
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

const cekStatus = async (apiKey, uniqCode) => {
  try {
    const payload = {
      key: apiKey,
      request: "status",
      unique_code: uniqCode,
      signature: crypto
        .createHash("md5")
        .update(apiKey + uniqCode + "StatusTransaction")
        .digest("hex"),
    };

    const data = new URLSearchParams(payload);

    const response = await axios.post(
      "https://paydisini.co.id/api/",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return response.data.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const cancelTrx = async (apiKey, uniqCode) => {
  try {
    const payload = {
      key: apiKey,
      request: "cancel",
      unique_code: uniqCode,
      signature: crypto
        .createHash("md5")
        .update(apiKey + uniqCode + "CancelTransaction")
        .digest("hex"),
    };

    const data = new URLSearchParams(payload);

    const response = await axios.post(
      "https://paydisini.co.id/api/",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const cekPay = async (apiKey) => {
  const payload = {
    key: apiKey,
    request: "payment_channel",
    signature: crypto
      .createHash("md5")
      .update(apiKey + "PaymentChannel")
      .digest("hex"),
  };

  const data = new URLSearchParams(Object.entries(payload));

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("https://paydisini.co.id/api/", data);
      resolve(response.data);
    } catch (error) {
      reject(new Error(error));
    }
  });
};

const callBack = async (apiKey, uniqCode) => {
  const payload = {
    key: apiKey,
    unique_code: uniqCode,
    status: "Canceled",
    signature: crypto
      .createHash("md5")
      .update(apiKey + uniqCode + "CallbackStatus")
      .digest("hex"),
  };

  const data = new URLSearchParams(Object.entries(payload));

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("https://wa.me/6281543496975", data);
      resolve(response.data);
    } catch (error) {
      reject(new Error(error));
    }
  });
};

module.exports = { createQR, cekStatus, cancelTrx, cekPay, callBack };
