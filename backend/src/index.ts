const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.ts");
const musicRoutes = require("./routes/music.ts");
const cookieParser = require("cookie-parser")


const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/music", musicRoutes);


if (process.argv.includes("--initdb")) {
    const { fillDatabase, initializeDatabase } = require("./initdb.ts");
    initializeDatabase(true).then(x => fillDatabase());
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
