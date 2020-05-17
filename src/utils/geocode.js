const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=sk.eyJ1IjoidXRrYXJzaG1laHRhIiwiYSI6ImNrOXh3am16YzBvbXQzbXBiOXltdWR1OGMifQ._liIJrc-G6RyYgj0dEX-Bw&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Connection Unavailable to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;