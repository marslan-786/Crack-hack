export default function handler(req, res) {
  // 1. Headers Mimic (اوریجنل جیسے ہیڈرز)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Connection', 'keep-alive');
  
  // ایپ کو دھوکہ دینے کے لیے یہ ہیڈرز بہت ضروری ہیں
  res.setHeader('Server', 'cloudflare'); 
  res.setHeader('X-Powered-By', 'PHP/8.0.30'); // ایپ کو لگے گا یہ PHP ہے
  res.setHeader('X-Provided-By', 'StackCDN');

  // 2. The EXACT Response from your capture (No Logic, Just Data)
  // ہم وہی ڈیٹا بھیج رہے ہیں جو اوریجنل ایپ نے قبول کیا تھا
  const fixedResponse = {
      "status": true,
      "data": {
          "Enc": "List Of Games",
          "Extra": "Welcome Vip Users",
          "modname": "PLEASE WAIT... IT WILL FIXED IN SOME HOURS",
          "mod_status": "Play Safe || Avoid Report",
          "credit": "TEST 123",
          // یہ وہی ٹوکن ہے جو آپ کے کیپچر میں تھا (MD5 of 898c...)
          "token": "3619ffaa0a989f6be018e9761cbfa599", 
          "device": "1",
          "EXP": "2025-11-21 18:34:12",
          "rng": 1763712260
      }
  };

  res.status(200).send(JSON.stringify(fixedResponse, null, 4));
}
