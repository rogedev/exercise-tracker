const express = require("express")
const cors = require("cors")
const { config } = require("dotenv")
const bodyParser = require("body-parser")

config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3030

app.listen(port, () => console.log(`Server is listening on port ${port}`))

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))
