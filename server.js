const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    let users = {};

    try {
        users = JSON.parse(
            fs.readFileSync("accounts.json", "utf8")
        );
    } catch {}

    users[username] = password;

    fs.writeFileSync(
        "accounts.json",
        JSON.stringify(users, null, 2)
    );

    res.json({ success: true });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    let users = {};

    try {
        users = JSON.parse(
            fs.readFileSync("accounts.json", "utf8")
        );
    } catch {}

    if (users[username] === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server chạy tại http://localhost:3000");
});
