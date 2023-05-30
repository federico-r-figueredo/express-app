const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const config = require("config");
const helmet = require("helmet");

const app = express();
const debug = require("debug")("app:start");
const home = require("./routes/home");
const courses = require("./routes/courses");

const PORT = process.env.PORT || 3000;

// process.browser is set when browserify'd via the `process` npm module
const isBrowser = process.browser;

const colors = {
    red: isBrowser ? "crimson" : 1,
    yellow: isBrowser ? "gold" : 3,
    cyan: isBrowser ? "darkturquoise" : 6,
    green: isBrowser ? "forestgreen" : 2,
    blue: isBrowser ? "steelblue" : 4,
    magenta: isBrowser ? "palevioletred" : 5
};

debug.color = colors.cyan;

// console.log("Application Name:", config.get("name"));
// console.log("Mail Host:", config.get("mail.host"));
// console.log("Mail Password:", config.get("mail.password"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
    app.use(morgan("dev"));
    debug("Morgan enabled...");
}

// custom middleware
app.use(logger);

// routes
app.use("/", home);
app.use("/api/courses", courses);

app.listen(PORT, () => {
    debug(`Listening on port ${PORT}...`);
});
