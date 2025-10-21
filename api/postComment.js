export default async function handler(req, res) {
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx6oIoBbI643fJMOaNXP50ZgTJRdHTWLz86s4D7T5NTjacHM9A23wqUepNTqwqgnGZc/exec'; // your deployed Google Apps Script URL

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const text = await response.text();
      return res.status(200).send(text);
    }

    if (req.method === 'GET') {
      const response = await fetch(`${googleScriptUrl}?postId=${req.query.postId || ''}`);
      const text = await response.text();
      return res.status(200).send(text);
    }

    res.status(405).send('Method not allowed');
  } catch (err) {
    console.error('Error in Vercel function:', err);
    res.status(500).json({ error: err.message });
  }
}
