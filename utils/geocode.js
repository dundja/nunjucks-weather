const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${process.env.MAPBOX_TOKEN}&types=place%2Ccountry`;
    request(
        {
            url,
            json: true
        },
        (err, res) => {
            if (err) {
                callback("Unable to connect to location services.", undefined);
            } else if (res.body.features.length === 0) {
                callback(
                    "Unable to find location. Try another search.",
                    undefined
                );
            } else {
                callback(null, {
                    latitude: res.body.features[0].center[0],
                    longitude: res.body.features[0].center[1],
                    location: res.body.features[0].place_name
                });
            }
        }
    );
};

module.exports = geocode;
