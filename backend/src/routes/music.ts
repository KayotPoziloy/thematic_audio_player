const express = require("express");
const pool = require("../db.ts");
const { authenticateToken } = require("../middleware/auth.ts");
const router = express.Router();
const fs = require('fs');

router.get("/getplaylists", authenticateToken, async (req, res) => {
    const playlists = await pool.query(`SELECT * FROM playlist`);
    res.json({ error: null, playlists: playlists.rows });
});

router.get("/getmusics", authenticateToken, async (req, res) => {
    const { id } = req.query;
    const musics = await pool.query(`SELECT * FROM music WHERE playlist_id = $1`, [id]);
    res.json({ error: null, musics: musics.rows });
});

router.get("/setlike", authenticateToken, async (req, res) => {
    const { id } = req.query;
    try {
        await pool.query("INSERT INTO likes (music_id, user_id) VALUES ($1, $2)", [id, req.user.id]);
        res.json({ error: null });
    } catch (err) {
        if (err.code === '23505') {
            res.json({ error: { error_code: 1, msg: "Уже есть лайк" } });
        } else {
            res.json({ error: { error_code: +err.code, msg: "Ошибка" } });
        }
    }
});

router.get("/removelike", authenticateToken, async (req, res) => {
    const { id } = req.query;
    await pool.query("DELETE FROM likes WHERE music_id = $1 AND user_id = $2", [id, req.user.id]);
    res.json({ error: null });
});

router.get("/getliked", authenticateToken, async (req, res) => {
    const likedMusic = await pool.query(` 
        SELECT music.* FROM music 
        JOIN likes ON music.id = likes.music_id 
        WHERE likes.user_id = $1`, [req.user.id]);

    res.json({ error: null, liked: likedMusic.rows });
});

// https://dev.to/gleidsonleite/symphony-in-bytes-mastering-audio-streaming-with-nodejs-2ipf
router.get("/m/:filename", authenticateToken, (req, res) => {
    const filename = req.params.filename;
    const filePath = `./music/${filename}`;
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            return res.status(404).send('File not found');
        }

        const { range } = req.headers;
        if (!range) {
            const head = {
                'Content-Length': stats.size,
                'Content-Type': 'audio/mpeg',
            };
            res.writeHead(200, head);

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
            stream.on('error', (err) => res.status(500).send(err));
            return;
        }

        const positions = range.replace(/bytes=/, '').split('-');
        const start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        const chunksize = end - start + 1;

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/mpeg',
        });

        const stream = fs.createReadStream(filePath, { start, end });
        stream.pipe(res);
        stream.on('error', (err) => res.status(500).send(err));
    });
});

module.exports = router;
