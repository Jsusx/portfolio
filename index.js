const express = require("express")
const app = express()
const port = 3000

app.use(express.static("public"))

app.listen(port, () => {
    console.log("Server started on port " + port)
})

app.get("/", (req, res) => {
    res.render("index")
})

app.get("*", (req, res) => {
    res.redirect("/")
})