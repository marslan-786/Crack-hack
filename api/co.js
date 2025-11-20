import crypto from 'crypto'; // MD5 بنانے کے لیے

export default function handler(req, res) {
  // ---------------------------------------------------------
  // 1. HEADERS MIMIC (LiteSpeed Style)
  // ---------------------------------------------------------
  
  // ہم Vercel کے ڈیفالٹ ہیڈرز کو ہٹا کر اوریجنل جیسے ہیڈرز لگائیں گے
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  
  // بالکل اوریجنل جیسا Content-Type (بڑے UTF-8 کے ساتھ)
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  
  // Caching کو بند کرنا ضروری ہے تاکہ ایپ کو ہر بار فریش ڈیٹا ملے
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');
  
  // Connection Headers (ایپ کو دھوکہ دینے کے لیے)
  res.setHeader('Connection', 'Keep-Alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=100');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ---------------------------------------------------------
  // 2. DATA LOGIC
  // ---------------------------------------------------------
  const source = req.method === 'POST' ? req.body : req.query;
  
  const gameType = source.game || "PREMIUM";
  const userKey = source.user_key || "DxCrack";
  const serialKey = source.serial || "670e6fa4-e3d7-3b02-a54b-d4960267b76d";

  // ---------------------------------------------------------
  // 3. DYNAMIC TOKEN GENERATION (MD5)
  // ---------------------------------------------------------
  // ہم سیریل اور ٹائم کو ملا کر ایک نیا ہیش بنائیں گے تاکہ ٹوکن ہر بار اصلی لگے
  const randomString = serialKey + Date.now().toString();
  const dynamicToken = crypto.createHash('md5').update(randomString).digest("hex");

  const generatedRealString = `${gameType}-${userKey}-${serialKey}-DIAMONDYT`;
  const currentRng = Math.floor(Date.now() / 1000);

  // ---------------------------------------------------------
  // 4. FINAL RESPONSE
  // ---------------------------------------------------------
  const responseData = {
    "status": true,
    "data": {
      "real": generatedRealString,
      "token": dynamicToken, // <--- اب یہ ہر بار نیا اور اصلی جیسا ہوگا
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

  // Pretty Print (4 Spaces)
  res.status(200).send(JSON.stringify(responseData, null, 4));
}
