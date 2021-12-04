const express = require("express");
const user = require("../express/user.json");
const application = express();

application.get("/", (req, res) => {
  res.send("<h1>Welcome To Home Page</h1>");
});
application.get("/user", (req, res) => {
  res.send({ user });
});
application.listen(1006, () => {
  console.log("Listening to port 1006");
});


