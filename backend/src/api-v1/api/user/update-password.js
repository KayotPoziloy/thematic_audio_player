const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");
const bcrypt = require("bcrypt");

module.exports = function () {
    let operations = {
        PUT: [authenticateToken, updateUserPassword],
    };

    async function updateUserPassword(req, res) {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: { msg: "Оба пароля обязательны" } });
        }

        try {
            // Проверяем текущий пароль
            const user = await pool.query("SELECT password FROM users WHERE id = $1", [req.user.id]);
            if (user.rows.length === 0) {
                return res.status(404).json({ error: { msg: "Пользователь не найден" } });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password);
            if (!isMatch) {
                return res.status(400).json({ error: { msg: "Текущий пароль неверен" } });
            }

            // Хэшируем новый пароль
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Обновляем пароль
            await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, req.user.id]);

            res.status(200).json({ msg: "Пароль успешно обновлен" });
        } catch (error) {
            console.error("Ошибка при обновлении пароля:", error);
            res.status(500).json({ error: { msg: "Ошибка сервера" } });
        }
    }

    updateUserPassword.apiDoc = {
        summary: "Обновить пароль пользователя",
        description: "Изменяет пароль пользователя после проверки текущего пароля",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            oldPassword: { type: "string" },
                            newPassword: { type: "string" },
                        },
                        required: ["oldPassword", "newPassword"],
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Пароль успешно обновлен",
            },
            400: {
                description: "Некорректный запрос или текущий пароль неверен",
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