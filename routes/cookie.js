const router = require("express").Router();
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
router.get("/info", async (req, res) => {
  res.json("Sends cookie all-auth-token");
});
router.get("/", async (req, res) => {
  console.log("getting the cookie from the cookie parser");
  console.log("Cookies found: "+ req.cookies)
  res
    .cookie("all-auth-token", "working", {
      maxAge: 86_400_000,
      httpOnly: true,
    })
    .send(req.cookies);
});
module.exports = router;
