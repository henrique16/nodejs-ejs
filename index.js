require('dotenv').config();
const express = require("express"),
    bodyParser = require("body-parser"),
    expressLayouts = require("express-ejs-layouts"),
    handleRoutes = require("./routes/routes"),
    app = express(),
    port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
    res.render("pages/home");
});

handleRoutes(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});