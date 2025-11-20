export default function handler(req, res) {
  // 1. Headers (بالکل اوریجنل جیسے)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8'); // UTF-8 بڑا لکھا ہے
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Data Extraction
  const source = req.method === 'POST' ? req.body : req.query;
  
  const gameType = source.game || "PREMIUM";
  const userKey = source.user_key || "DxCrack";
  // اگر ایپ سیریل بھیج رہی ہے تو وہ، ورنہ ڈیفالٹ
  const serialKey = source.serial || "670e6fa4-e3d7-3b02-a54b-d4960267b76d";

  // 3. Dynamic Values
  const generatedRealString = `${gameType}-${userKey}-${serialKey}-DIAMONDYT`;
  
  // موجودہ ٹائم (RNG) تاکہ سرور کو لگے یہ تازہ رسپونس ہے
  // Date.now() ملی سیکنڈ دیتا ہے، اس لیے 1000 سے تقسیم کر کے سیکنڈز نکال رہے ہیں
  const currentRng = Math.floor(Date.now() / 1000);

  // 4. Data Object
  const responseData = {
    "status": true,
    "data": {
      "real": generatedRealString,
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
      "rng": currentRng // <--- یہ اب ہر سیکنڈ اپڈیٹ ہوگا
    }
  };

  // 5. SEND RESPONSE WITH PRETTY PRINT (Space: 4)
  // یہ سب سے اہم لائن ہے۔ JSON.stringify کا تیسرا پیرامیٹر '4' ہے جو فارمیٹنگ کرتا ہے۔
  res.status(200).send(JSON.stringify(responseData, null, 4));
}
