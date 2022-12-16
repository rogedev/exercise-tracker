const { User } = require("../database/schemas/user")

const saveUser = async ({ username }) => {
  user = new User({ username })

  await user.save()

  return {
    username: user.username,
    _id: user._id,
  }
}

module.exports = saveUser
