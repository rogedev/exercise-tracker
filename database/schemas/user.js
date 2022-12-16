const { Schema, model } = require("mongoose")
const { exerciseSchema } = require("./exercise")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    log: [exerciseSchema],
    count: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
)

const User = model("user", userSchema)

module.exports = { userSchema, User }
