const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { resolve } = require("url");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Caue Moalli",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Caue Moalli",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is a help message!",
    name: "Caue Moalli",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error: File not found",
    errorMsg: "Help page not found, my explorer",
    name: "Caue Moalli",
  });
});

// ERROR GET - MUST BE THE LAST
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error: File not found",
    errorMsg: "Page not found, my dude",
    name: "Caue Moalli",
  });
});

app.listen(3000, () => {
  console.log("Listening @ port 3000");
});
