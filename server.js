const express = require("express");
const chalk = require("chalk");
const path = require("path");
require("dotenv").config();

const registerController = require("./controllers/register");
const loginController = require("./controllers/login");

//use routing for requests for protected routes
const protectedRoute = require("./routes/protected");

const app = express();
//use protected route for such request
app.use("/protected", protectedRoute);

//set up a static folder
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

//use json
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

//serve html files from the static folder
app.get("/register", (req, res) => {
  res.sendFile(staticDir + "/register.html");
});

//like section
const like = require("./controllers/likeBlog");
app.post("/like", like);

app.post("/register", registerController);
app.post("/login", loginController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(chalk.magenta(`SERVER STARTED ON PORT ${PORT}`))
);
