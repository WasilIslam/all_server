const router = require("express").Router();
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
router.get("/info", async (req, res) => {
  res.json("Google Authentication");
});
router.post("/", async (req, res) => {
  try {
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const {name, email, picture} = ticket.getPayload();
    const user = {name, email, picture};
    //save the user in the database if u wish it
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
