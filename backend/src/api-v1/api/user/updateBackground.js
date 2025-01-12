const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        PUT: [authenticateToken, PUT],
    };

    async function PUT(req, res) {
        const { backgroundUrl } = req.body;

        if (!backgroundUrl || typeof backgroundUrl !== "string") {
            return res.status(400).json({ error: { msg: "Неверный формат данных" } });
        }

        try {
            const result = await pool.query(
                "UPDATE users SET background_url = $1 WHERE id = $2 RETURNING background_url",
                [backgroundUrl, req.user.id]
            );

            if (result.rowCount === 0) {
                return res.status(404).json({ error: { msg: "Пользователь не найден" } });
            }

            res.status(200).json({ background_url: result.rows[0].background_url });
        } catch (err) {
            console.error("Ошибка при обновлении шапки:", err);
            res.status(500).json({ error: { msg: "Ошибка сервера" } });
        }
    }

    PUT.apiDoc = {
        summary: "Обновление шапки пользователя",
        description: "Обновляет шапку пользователя в базе данных.",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            backgroundUrl: { type: "string" },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Шапка успешно обновлена",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                background_url: { type: "string" },
                            },
                        },
                    },
                },
            },
            400: {
                description: "Неверный формат данных",
            },
            404: {
                description: "Пользователь не найден",
            },
            500: {
                description: "Ошибка сервера",
            },
        },
    };

    return operations;
};