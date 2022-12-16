const { Exercise } = require("../database/schemas/exercise")
const { User } = require("../database/schemas/user")

const saveExercise = async ({ id, description, duration, date }) => {
  const exerciseDate = date ? new Date(date) : new Date()
  const exercise = new Exercise({
    description,
    duration: +duration,
    date: exerciseDate.toDateString(),
    created_at: exerciseDate,
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
    duration: +exercise.duration,
    description: exercise.description,
  }
}

module.exports = saveExercise
