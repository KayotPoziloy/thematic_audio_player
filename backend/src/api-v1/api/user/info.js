const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = function () {
    let operations = {
        GET: [authenticateToken, GET],
    };

    async function GET(req, res) {
        try {
            const user = await pool.query("SELECT id, login, name FROM users WHERE id = $1", [req.user.id]);
            if (user.rows.length === 0) {
                return res.status(404).json({ error: { msg: "Пользователь не найден" } });
            }

            res.status(200).json({
                id: user.rows[0].id,
                login: user.rows[0].login,
                name: user.rows[0].name,
            });
        } catch (err) {
            console.error("Ошибка при получении данных пользователя:", err);
            res.status(500).json({ error: { msg: "Ошибка сервера" } });
        }
    }

    GET.apiDoc = {
        summary: "Получить данные пользователя",
        description: "Возвращает данные о текущем пользователе",
        responses: {
            200: {
                description: "Успешный ответ",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                login: { type: "string" },
                                name: { type: "string" },
                            },
                        },
                    },
                },
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
