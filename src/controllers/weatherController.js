const request = require("request");
const geoip = require("geoip-lite");
const forecast = require("../../utils/forecast");
const geocode = require("../../utils/geocode");

async function weather(req, res) {
    if (!req.query.address) {
        let ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket
                ? req.connection.socket.remoteAddress
                : null);
        var geo = geoip.lookup(ip);
        if (geo) {
            req.query.address = geo.city;
        } else {
            req.query.address = "Prague";
        }
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (units = "si"), (error, data) => {
                if (error) {
                    return res.send({ error });
                }

                if (units === "si") {
                    units = true;
                } else {
                    units = false;
                }

                res.render("pages/index", {
                    currently: data.currently,
                    daily: data.daily,
                    location,
                    units
                });
            });
        }
    );
}

module.exports = weather;
