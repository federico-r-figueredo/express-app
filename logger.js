const EventEmitter = require("node:events");

const url = "http:/mylogger.io/log";

class Logger extends EventEmitter {
    log(message) {
        // Send HTTP request
        console.log(message);

        this.emit("messageLogged", "logged!");
    }
}

module.exports = Logger;
