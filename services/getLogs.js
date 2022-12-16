const { User } = require("../database/schemas/user")

const getLogs = async ({ id, from, to, limit }) => {
  const user = await User.findById(id).exec()

  const response = applyFilters(
    {
      _id: user._id,
      username: user.username,
      log: user.log.map((item) => ({
        description: item.description,
        duration: +item.duration,
        date: item.date,
        created_at: item.created_at
      })),
    },
    limit,
    from,
    to
  )

  return response
}

const applyFilters = (data, limit, from, to) => {
  if (from || to) {
    let fromDate = new Date(0)
    let toDate = new Date()

    if (from) fromDate = new Date(from)

    if (to) toDate = new Date(to)

    fromDate = fromDate.getTime()
    toDate = toDate.getTime()

    data.log = data.log.filter((session) => {
      let sessionDate = new Date(session.created_at).getTime()
      return sessionDate >= fromDate && sessionDate <= toDate
    })
  }

  if (limit) data.log = data.log.slice(0, limit)

  data.count = data.log.length

  return data
}

module.exports = getLogs
