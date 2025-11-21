import crypto from 'crypto';

export default function handler(req, res) {
  // ---------------------------------------------------------
  // 1. HEADERS & CONFIGURATION (To Mimic PHP/Cloudflare)
  // ---------------------------------------------------------
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // "charset=UTF-8" is crucial here as per your capture
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  
  // Preventing Cache
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Handle Pre-flight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ---------------------------------------------------------
  // 2. DATA CAPTURE & LOGIC
  // ---------------------------------------------------------
  
  // Get data from POST body or URL query
  const source = req.method === 'POST' ? req.body : req.query;

  // Default Serial just in case app doesn't send one
  const serialKey = source.serial || "898c263a-0382-38ab-8d09-3873f322414b";

  // --- TOKEN LOGIC (CRACKED: MD5 of SERIAL) ---
  // The app expects the token to be the MD5 hash of the serial number sent.
  const dynamicToken = crypto.createHash('md5').update(serialKey).digest("hex");

  // --- TIME & DATE LOGIC ---
  const now = new Date();
  
  // RNG: Current Unix Timestamp
  const currentRng = Math.floor(now.getTime() / 1000);

  // EXP: Calculate Expiry Date (e.g., +30 Days from now)
  // Format needs to be: YYYY-MM-DD HH:mm:ss
  const expDate = new Date(now.setDate(now.getDate() + 30)); 
  
  const format = (num) => num.toString().padStart(2, '0');
  const expString = `${expDate.getFullYear()}-${format(expDate.getMonth() + 1)}-${format(expDate.getDate())} ${format(expDate.getHours())}:${format(expDate.getMinutes())}:${format(expDate.getSeconds())}`;

  // ---------------------------------------------------------
  // 3. FINAL RESPONSE JSON
  // ---------------------------------------------------------
  const responseData = {
    "status": true,
    "data": {
        "Enc": "List Of Games",
        "Extra": "Welcome Vip Users",
        "modname": "PLEASE WAIT... IT WILL FIXED IN SOME HOURS",
        "mod_status": "Play Safe || Avoid Report",
        "credit": "TEST 123",
        "token": dynamicToken,  // <--- 100% Verified Logic
        "device": "1",
        "EXP": expString,       // <--- Dynamic Future Date
        "rng": currentRng
    }
  };

  // ---------------------------------------------------------
  // 4. SEND RESPONSE (Pretty Print 4 Spaces)
  // ---------------------------------------------------------
  // JSON.stringify with 4 spaces mimics the exact format of the original server
  res.status(200).send(JSON.stringify(responseData, null, 4));
}
