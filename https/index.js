module.exports = (app) => {
    const fs = require("fs");
    const https = require("https");
    return https.createServer({
        rejectUnauthorized: false,
        key: fs.readFileSync("./https/my.key"),
        cert: fs.readFileSync("./https/my.crt")
    }, app);
};