const express = require("express");

const weather = require("./controllers/weatherController");
const fourOfour = require("./controllers/404Controller");
const routes = express.Router();

// weather
routes.get("/", (req, res) => {
    res.redirect("/weather");
});
routes.get("/weather", weather);
routes.get("*", fourOfour);

module.exports = routes;
