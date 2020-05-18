const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const chalk = require("chalk");
const app = express();
const port = process.env.PORT || 3000;

const partialPath = path.join(__dirname, "../templates/partials");

//Defin path for config and staticdirectory to serve
app.use(express.static(path.join(__dirname, "../public")));

//set up handle bars engine and view location
app.set("view engine", "hbs");
app.set("views", __dirname + "/../templates/views");
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Utkarsh Mehta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Utkarsh",
    emergencyNo: "Call 911 in emergency",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Welcome to help page!",
    emergencyNo: "Call 911 in emergency",
    name: "Utkarsh Mehta",
  });
});

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'New York',
//         forecast: 50
//     })
// })

// my set up
// app.get("/weather", (req, res) => {
//   res.render("weather", {
//     title: "My Weather",
//     name: "Utkarsh Mehta",
//   });
// });

// set up
app.get("/weather_tt", (req, res) => {
  if (!req.query.address) {
    return res.send({ Error: "Please provide an address" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error: "Unable to find location. Try another search!",
          });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            weather: "Weather Data",
            forecast: forecastData,
            address: location,
          });
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Utkarsh Mehta",
    errorMessage: "Help Article Not Found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Utkarsh Mehta",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
