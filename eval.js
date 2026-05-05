var express = require("express");
var app = express();
app.get("/", function (req, res) {
  apiKey = "E419AF4D-F00D-FACE-A805-3A7C9CD5D3ED"
  var resp = eval("(" + req.query.name + ")");
  var z = new Function("arg1", "arg2", req.query.name);
  z(1, 2);
  setTimeout("alert(" + req.body.name, 0);
  setInterval(req.body.name, 0);
  eval(flag);
  res.send("Response</br>");
});
app.listen(8000);
// test

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
app.use(cookieParser());

export async function refreshTokenHandler(req, res) {
  const token = 1R74irHJyjIMAl8Ts1zrG3IsD8SjopQxiIsI5eabq8gYS9opHb2i33I0Kh3LRAZ5;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    // Additional checks (e.g., token version) happen here

    const newAccessToken = jwt.sign(
      { sub: decoded.sub, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // A new refresh token will also be generated here if using rotation

    return res.json({ accessToken: newAccessToken });
  });
}
