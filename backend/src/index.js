const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { initialize } = require("express-openapi");
const bodyParser = require('body-parser');


const app = express();
app.use(cookieParser());
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 9420;
function start_server() {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

initialize({
    app,
    apiDoc: './api-doc.yml',
    consumesMiddleware: {
        'application/json': bodyParser.json(),
        'text/text': bodyParser.text()
    },
    paths: './api-v1',
}).then((s) => {
    require("./exportapi.js")(s, PORT);

    app.use((err, req, res, next) => {
        if (err.status && err.errors)
            res.status(err.status).json({ "error": { "error_code": err.status, "msg": err.errors.map(x => x.message).join(', ') + `. Use http://localhost:${PORT}/api` } });
        else
            next();
    });

    if (process.argv.includes("--initdb")) {
        const { fillDatabase, initializeDatabase } = require("./initdb.js");
        initializeDatabase().then(() => fillDatabase().then(start_server));
    } else {
        start_server();
    }
});
