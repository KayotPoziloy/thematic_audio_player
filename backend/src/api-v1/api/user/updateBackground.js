const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = {
    PUT: [
        authenticateToken,
        async function (req, res) {
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
        },
    ],
};