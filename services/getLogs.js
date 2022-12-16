const { User } = require("../database/schemas/user")

const getLogs = async ({ id, from = null, to = null, limit = null }) => {
  const user = await User.findById(id).exec()

  const response = {
    _id: user._id,
    username: user.username,
    log: user.log,
  }

  if (limit) response.log = user.log.slice(0, limit)

  if (from || to) {
    let fromDate = new Date(0)
    let toDate = new Date()

    if (from) fromDate = new Date(from)

    if (to) toDate = new Date(to)

    fromDate = fromDate.getTime()
    toDate = toDate.getTime()

    response.log = response.log.filter((session) => {
      let sessionDate = new Date(session.date).getTime()
      return sessionDate >= fromDate && sessionDate <= toDate
    })
  }

  response.count = response.log.length

  return response
}

module.exports = getLogs
