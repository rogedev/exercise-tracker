const { Exercise } = require("../database/schemas/exercise")
const { User } = require("../database/schemas/user")

const saveExercise = async ({ id, description, duration, date }) => {
  const exercise = new Exercise({
    description,
    duration: +duration,
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
  })

  await exercise.save()

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        log: exercise,
      },
    },
    {
      new: true,
    }
  ).exec()

  return {
    _id: user._id,
    username: user.username,
    date: exercise.date,
    description: exercise.description,
    duration: exercise.duration,
  }
}

module.exports = saveExercise
