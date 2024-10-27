const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db.ts");
const { authenticateToken, createToken, removeToken } = require("../middleware/auth.ts");
const router = express.Router();

router.get("/signin", async (req, res) => {
    const { login, password } = req.query;
    const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
    if (user.rows.length > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (match) {
            const token = createToken(res, { id: user.rows[0].id, login: user.rows[0].login, privilege: user.rows[0].privilege, timeStart: (+new Date())});
            res.json({ error: null, token });
        } else {
            res.json({ error: { error_code: 0, msg: "Неверный пароль" } });
        }
    } else {
        res.json({ error: { error_code: 0, msg: "Пользователь не найден" } });
    }
});

router.get("/signup", async (req, res) => {
    const { login, password, name } = req.query;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await pool.query("INSERT INTO users (login, password, name, privilege) VALUES ($1, $2, $3, 1) RETURNING *", [login, hashedPassword, name]);
        res.json({ error: null });
    } catch (err) {
        if (err.code === '23505') {
            res.json({ error: { error_code: 1, msg: "Логин уже использован" } });
        } else {
            res.json({ error: { error_code: +err.code, msg: "Ошибка при регистрации" } });
        }
    }
});

router.get("/logout", authenticateToken, (req, res) => {
    removeToken(res);
    res.json({ error: null });
});

router.get("/getinfo", authenticateToken, async (req, res) => {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
    res.json({ error: null, id: user.rows[0].id, login: user.rows[0].login, name: user.rows[0].name, privilege: user.rows[0].privilege });
});

module.exports = router;
