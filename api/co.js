import crypto from 'crypto';

export default function handler(req, res) {
  // ---------------------------------------------------------
  // 1. HEADERS (Case Sensitive Fix)
  // ---------------------------------------------------------
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // یہ لائن سب سے اہم ہے: UTF-8 بڑا ہونا چاہیے
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');
  res.setHeader('Connection', 'keep-alive'); // Original server style

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ---------------------------------------------------------
  // 2. DATA CAPTURE
  // ---------------------------------------------------------
  const source = req.method === 'POST' ? req.body : req.query;

  const serialKey = source.serial || "898c263a-0382-38ab-8d09-3873f322414b";
  const userKey = source.user_key || "TEST 123"; // User key ko Credit me show krne k liye

  // ---------------------------------------------------------
  // 3. TOKEN LOGIC (MD5 of Serial)
  // ---------------------------------------------------------
  const dynamicToken = crypto.createHash('md5').update(serialKey).digest("hex");

  // ---------------------------------------------------------
  // 4. TIME & DEVICE LOGIC
  // ---------------------------------------------------------
  const now = new Date();
  const currentRng = Math.floor(now.getTime() / 1000);

  // EXPIRY DATE: 2099 (Lifetime) 
  // آپ نے 2019 کہا تھا لیکن وہ ایکسپائر ہو جائے گا، اس لیے 2099 کر رہا ہوں۔
  const expString = "2099-12-31 23:59:59";

  // ---------------------------------------------------------
  // 5. FINAL RESPONSE
  // ---------------------------------------------------------
  const responseData = {
    "status": true,
    "data": {
        "Enc": "List Of Games",
        "Extra": "Welcome Vip Users",
        "modname": "PLEASE WAIT... IT WILL FIXED IN SOME HOURS",
        "mod_status": "Play Safe || Avoid Report",
        
        // یہاں user_key واپس بھیج رہے ہیں تاکہ ایپ کو لگے یہ وہی بندہ ہے
        "credit": userKey, 
        
        "token": dynamicToken,
        
        // آپ کی ڈیمانڈ کے مطابق 100 (پہلے 1 تھا)
        "device": "100", 
        
        "EXP": expString,
        "rng": currentRng
    }
  };

  // Pretty Print (4 Spaces) like original
  res.status(200).send(JSON.stringify(responseData, null, 4));
}
