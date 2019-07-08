const request = require("request");

const forecast = (
    latitude = "37.8267",
    longitude = "-122.4233",
    units = "ca",
    callback
) => {
    request(
        {
            url: `https://api.darksky.net/forecast/${
                process.env.API_KEY
            }/${latitude},${longitude}?units=${units}`,
            json: true
        },
        (err, res) => {
            if (err) {
                callback("Unable to connect to web services.", undefined);
            } else if (res.body.error) {
                callback("Unable to find location", undefined);
            } else {
                callback(null, {
                    currently: res.body.currently,
                    daily: res.body.daily,
                    units
                });
            }
        }
    );
};

module.exports = forecast;
