const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const path = require("path");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();

app.use(express.static(path.resolve(__dirname, "src", "public")));

nunjucks.configure(path.resolve(__dirname, "src", "views"), {
    autoescape: true,
    express: app
});

app.set("view engine", "njk");
app.use("/", routes);

app.listen(process.env.PORT || 3000);
