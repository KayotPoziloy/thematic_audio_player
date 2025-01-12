const pool = require("./db.js");
const bcrypt = require("bcrypt");

async function initializeDatabase() {
    try {
        await pool.query('DROP TABLE IF EXISTS users, music, likes, playlist;');
        console.log("Drop database successfully.");
        
        for (let q of [
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                login VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                privilege INTEGER NOT NULL,
                avatar VARCHAR(255) NOT NULL DEFAULT 'def.png',
                header VARCHAR(255) NOT NULL DEFAULT '' 
            );`,

            `CREATE TABLE IF NOT EXISTS playlist (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                tag TEXT NOT NULL
            );`,

            `CREATE TABLE IF NOT EXISTS music (
                id SERIAL PRIMARY KEY,
                playlist_id INTEGER REFERENCES playlist(id) ON DELETE CASCADE NOT NULL,
                name VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                filename VARCHAR(255) NOT NULL,
                tag TEXT NOT NULL
            );`,

            `CREATE TABLE IF NOT EXISTS likes (
                music_id INTEGER REFERENCES music(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                PRIMARY KEY (music_id, user_id)
            );`
        ]) { await pool.query(q) }

        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Failed to initialize the database:", err);
    }
}
async function fillDatabase() {
    await pool.query("DELETE FROM likes");
    await pool.query("DELETE FROM music");
    await pool.query("DELETE FROM playlist");
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('./music/config.json', 'utf8'));
    for (let playlist of config) {
        const newPlaylist = await pool.query("INSERT INTO playlist (name, tag) VALUES ($1, $2) RETURNING id", [playlist.name, JSON.stringify(playlist.tag)]);
        for (let x of playlist.music) {
            await pool.query("INSERT INTO music (playlist_id, name, author, filename, tag) VALUES ($1, $2, $3, $4, $5)", [newPlaylist.rows[0].id, x.name, x.author, x.filename, JSON.stringify(x.tag)]);
        }
    }
    await pool.query("INSERT INTO users (login, password, name, privilege) VALUES ($1, $2, $3, $4)", ["admin", await bcrypt.hash("admin", 10), "admin", 10]);
}

module.exports = { fillDatabase, initializeDatabase };
