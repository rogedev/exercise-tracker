const { config } = require("dotenv")

const mongoose = require("mongoose")

config()

const uri = process.env.MONGO_URI

const dbName = process.env.DB_NAME

const dbConnection = () =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  })

module.exports = dbConnection
