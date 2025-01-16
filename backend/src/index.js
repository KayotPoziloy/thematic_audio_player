const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { initialize } = require("express-openapi");
const bodyParser = require("body-parser");
const updateAvatarRoutes = require("./api-v1/api/user/updateAvatar.js");
const updateBackgroundRoutes = require("./api-v1/api/user/updateBackground.js");

const app = express();

// Увеличиваем лимит размера тела запроса для JSON и URL-encoded данных
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.options("*", cors());

// Подключаем PUT для обновления аватарки
app.put("/api/user/update-avatar", ...updateAvatarRoutes.PUT);
app.put("/api/user/update-background", ...updateBackgroundRoutes.PUT);

const PORT = process.env.PORT || 4000;

function start_server() {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

initialize({
    app,
    apiDoc: "./api-doc.yml",
    consumesMiddleware: {
        "application/json": bodyParser.json(),
        "text/text": bodyParser.text(),
    },
    paths: "./api-v1",
}).then((s) => {
    require("./exportapi.js")(s, PORT);

    // Глобальный обработчик ошибок OpenAPI
    app.use((err, req, res, next) => {
        if (err.status && err.errors) {
            res.status(err.status).json({
                error: {
                    error_code: err.status,
                    msg: err.errors.map((x) => x.message).join(", ") + `. Use http://localhost:${PORT}/api`,
                },
            });
        } else next();
    });

    // Проверка аргументов командной строки и запуск
    if (process.argv.includes("--initdb")) {
        const { fillDatabase, initializeDatabase } = require("./initdb.js");
        initializeDatabase().then(() => fillDatabase().then(start_server));
    } else {
        start_server();
    }
});
