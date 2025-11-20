export default function handler(req, res) {
  // -------------------------------------------------------
  // 1. HEADERS & CONFIGURATION
  // -------------------------------------------------------
  // یہ ہیڈرز اس لیے ہیں تاکہ ایپ کو لگے کہ وہ اصلی سرور سے بات کر رہی ہے
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, User-Agent'
  );

  // Pre-flight check (Browser/App checking connectivity)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // -------------------------------------------------------
  // 2. DATA CAPTURING (Dynamic Logic)
  // -------------------------------------------------------
  
  // ہم چیک کریں گے کہ ڈیٹا POST (body) میں ہے یا GET (url) میں
  const source = req.method === 'POST' ? req.body : req.query;

  // --- DYNAMIC VALUES ---
  // اگر ایپ نے ڈیٹا بھیجا تو وہ اٹھاؤ، ورنہ ڈیفالٹ ویلیو لگا دو
  
  // 1. Game Type (e.g., PREMIUM, VIP, SAFE)
  const gameType = source.game || "PREMIUM";
  
  // 2. User Key (e.g., DxCrack, Ahmad, Ali)
  const userKey = source.user_key || "DxCrack";
  
  // 3. Serial Key (e.g., 670e6fa4...)
  const serialKey = source.serial || "670e6fa4-e3d7-3b02-a54b-d4960267b76d";

  // -------------------------------------------------------
  // 3. GENERATING THE "REAL" STRING
  // -------------------------------------------------------
  // فارمولا: [GAME] - [USER] - [SERIAL] - DIAMONDYT
  
  const generatedRealString = `${gameType}-${userKey}-${serialKey}-DIAMONDYT`;

  // -------------------------------------------------------
  // 4. FINAL RESPONSE JSON
  // -------------------------------------------------------
  const responseJson = {
    "status": true,
    "data": {
      "real": generatedRealString, // <--- یہ اب مکمل ڈائنامک ہے
      "token": "5ce980880ec73abd54fc34acbb64c1bd",
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
      "rng": 1763657958
    }
  };

  // Response Send karen
  res.status(200).json(responseJson);
}
