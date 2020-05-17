const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=50f64ded6e2db7c05779d72f2c747b68&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Connection Unavailable to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + 'C and feels like ' + body.current.feelslike + 'C');
        }
    })
}

module.exports = forecast