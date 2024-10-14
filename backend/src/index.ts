import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;

const test = 0; //коснтанта для тестинга pr

app.use(cors());

app.get("/audio", (req, res) => {
    const audio = path.join(__dirname, "audio.mp3");
    res.sendFile(audio);
});


app.listen(PORT, () => {
    console.log(`Старт сервера на порту http://localhost:${PORT}`);
});
