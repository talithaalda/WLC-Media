// pages/api/logout.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Hapus cookie dengan nama 'token'
    res.setHeader(
      "Set-Cookie",
      "token=; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    // Send success response
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
