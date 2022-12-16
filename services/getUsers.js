const dbConnection = require("../database/connection")
const { User } = require("../database/schemas/user")

const getUsers = async () => {
  const users = await User.find().select({ _id: 1, username: 1 })

  return users
}

module.exports = getUsers
