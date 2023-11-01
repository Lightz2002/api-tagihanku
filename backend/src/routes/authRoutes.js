const express = require("express");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.API_URL + "auth/google/callback"
);

const router = express.Router();

router.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // Use 'offline' for long-term access
  });
  res.redirect(url);
});

router.get("/auth/google/callback", (req, res) => {
  const code = req.query.code;

  // Exchange the code for an access token and refresh token
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      // Handle the error
    } else {
      // Store tokens for future use
      oauth2Client.setCredentials(tokens);
      // Redirect or respond with a success message
    }
  });
});

module.exports = router;
