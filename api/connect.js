export default function handler(req, res) {
  // 1. Setup Headers (Taake koi error na aye)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Handle OPTIONS request (Pre-flight check)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. Data Extraction (Smart Logic)
  // ایپ جو ڈیٹا بھیج رہی ہے (game, user_key, serial) اس کو یہاں پکڑیں گے
  // اگر POST ہے تو body سے لے گا، اگر GET ہے تو query سے
  const requestData = req.method === 'POST' ? req.body : req.query;

  // ڈیفالٹ ویلیوز (جو آپ نے JSON دیا تھا)
  const defaultSerial = "670e6fa4-e3d7-3b02-a54b-d4960267b76d";
  const defaultUserKey = "DxCrack";

  // اگر ایپ نے سیریل بھیجا ہے تو وہ استعمال کرو، ورنہ ڈیفالٹ والا
  const currentSerial = requestData.serial || defaultSerial;
  const currentUserKey = requestData.user_key || defaultUserKey;

  // 4. Create the Response JSON
  const responseData = {
    "status": true,
    "data": {
      // یہاں ہم "user_key" اور "serial" کو جوڑ کر اصلی جیسا رسپونس بنا رہے ہیں
      "real": `PREMIUM-${currentUserKey}-${currentSerial}-DIAMONDYT`,
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
      "rng": 1763657810
    }
  };

  // 5. Send the Response
  res.status(200).json(responseData);
}
