const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/register", (req, res) => {
const { username, password } = req.body;


let accounts = {};

if (fs.existsSync("accounts.json")) {
    accounts = JSON.parse(
        fs.readFileSync("accounts.json", "utf8")
    );
}

accounts[username] = password;

fs.writeFileSync(
    "accounts.json",
    JSON.stringify(accounts, null, 2)
);

res.json({ success: true });


});

app.post("/login", (req, res) => {
const { username, password } = req.body;


let accounts = JSON.parse(
    fs.readFileSync("accounts.json", "utf8")
);

if (accounts[username] === password) {
    res.json({ success: true });
} else {
    res.json({ success: false });
}


});

app.listen(3000, () => {
console.log("http://localhost:3000");
});
