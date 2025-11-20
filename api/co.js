import crypto from 'crypto'; 

export default function handler(req, res) {
  // ---------------------------------------------------------
  // 1. HEADERS SETUP
  // ---------------------------------------------------------
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');
  res.setHeader('Connection', 'Keep-Alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=100');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ---------------------------------------------------------
  // 2. DATA CAPTURE
  // ---------------------------------------------------------
  const source = req.method === 'POST' ? req.body : req.query;
  
  const gameType = source.game || "PREMIUM";
  const userKey = source.user_key || "DxCrack";
  
  // ڈیفالٹ سیریل (اگر ایپ نے نہیں بھیجی تو یہ استعمال ہوگی)
  const defaultSerial = "670e6fa4-e3d7-3b02-a54b-d4960267b76d";
  const serialKey = source.serial || defaultSerial;

  // ---------------------------------------------------------
  // 3. THE CRACKED LOGIC (MD5 of SERIAL Only)
  // ---------------------------------------------------------
  
  // ٹوکن بنانے کا صحیح طریقہ: صرف سیریل کی کا MD5 ہیش بنائیں
  const correctToken = crypto.createHash('md5').update(serialKey).digest("hex");

  // Real String
  const generatedRealString = `${gameType}-${userKey}-${serialKey}-DIAMONDYT`;
  
  // RNG Time
  const currentRng = Math.floor(Date.now() / 1000);

  // ---------------------------------------------------------
  // 4. RESPONSE
  // ---------------------------------------------------------
  const responseData = {
    "status": true,
    "data": {
      "real": generatedRealString,
      "token": correctToken, // <--- اب یہ 100% میچ کرے گا
      "modname": "VIP LOADER",
      "mod_status": "Safe",
      "credit": "D",
      "ESP": "on",
      "Item": "on",
      "AIM": "on",
      "SilentAim": "on",
      "BulletTrack": "on",
      "Floating": "on",
      "Memory": "on",
      "Setting": "on",
      "expired_date": "2029-11-30 16:57:42",
      "EXP": "2029-11-30 16:57:42",
      "ts": "2029-11-30 16:57:42",
      "exdate": "2029-11-30 16:57:42",
      "device": "100000",
      "rng": currentRng
    }
  };

  // Send with Pretty Print
  res.status(200).send(JSON.stringify(responseData, null, 4));
}
