const pool = require("../../../db.js");
const { authenticateToken } = require("../../../middleware/auth.js");

module.exports = {
    PUT: [
        authenticateToken,
        async function (req, res) {
            const { avatarUrl } = req.body;

            if (!avatarUrl || typeof avatarUrl !== "string") {
                return res.status(400).json({ error: { msg: "Неверный формат данных" } });
            }

            try {
                const result = await pool.query(
                    "UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING avatar_url",
                    [avatarUrl, req.user.id]
                );

                if (result.rowCount === 0) {
                    return res.status(404).json({ error: { msg: "Пользователь не найден" } });
                }

                res.status(200).json({ avatar_url: result.rows[0].avatar_url });
            } catch (err) {
                console.error("Ошибка при обновлении аватарки:", err);
                res.status(500).json({ error: { msg: "Ошибка сервера" } });
            }
        },
    ],
};