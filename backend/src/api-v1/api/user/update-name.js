const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        PUT: [authenticateToken, updateUserName],
    };

    async function updateUserName(req, res) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: { msg: "Имя пользователя обязательно" } });
        }

        try {
            const result = await pool.query(
                "UPDATE users SET name = $1 WHERE id = $2 RETURNING name",
                [name, req.user.id]
            );

            if (result.rowCount === 0) {
                return res.status(404).json({ error: { msg: "Пользователь не найден" } });
            }

            res.status(200).json({ msg: "Имя пользователя успешно обновлено", name: result.rows[0].name });
        } catch (error) {
            console.error("Ошибка при обновлении имени пользователя:", error);
            res.status(500).json({ error: { msg: "Ошибка сервера" } });
        }
    }

    updateUserName.apiDoc = {
        summary: "Обновить имя пользователя",
        description: "Обновляет имя пользователя в базе данных",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                        },
                        required: ["name"],
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Имя пользователя успешно обновлено",
            },
            400: {
                description: "Некорректный запрос",
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