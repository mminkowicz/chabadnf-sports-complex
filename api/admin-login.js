const parseBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.UPDATE_TOTAL_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ message: 'Admin password is not configured' });
  }

  let body;

  try {
    body = parseBody(req.body);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  if (body.password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  return res.status(200).json({ ok: true });
};
