const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./app/Database");
const route = require("./routes/index.route");
const cors = require("cors");

require("dotenv").config();

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
// Add bodyParser middleware for JSON and URL-encoded form data
app.use(bodyParser.json()); // This allows the server to handle JSON data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
