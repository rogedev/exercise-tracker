const express = require("express")
const cors = require("cors")
const { config } = require("dotenv")
const bodyParser = require("body-parser")
const getUsers = require("./services/getUsers")
const saveUser = require("./services/saveUser")
const saveExercise = require("./services/saveExercise")
const getLogs = require("./services/getLogs")
const dbConnection = require("./database/connection")

config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3030

dbConnection()

app.listen(port, () => console.log(`Server is listening on port ${port}`))

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"))

app.get("/api/users", async (req, res) => res.send(await getUsers()))

app.post("/api/users", async (req, res) => res.send(await saveUser(req.body)))

app.post("/api/users/:_id/exercises", async (req, res) =>
  res.send(await saveExercise({ id: req.params._id, ...req.body }))
)

app.get("/api/users/:_id/logs", async (req, res) =>
  res.send(await getLogs({ id: req.params._id, ...req.query }))
)
