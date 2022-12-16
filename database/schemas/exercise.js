const { Schema, model } = require("mongoose")

const exerciseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: String,
  },
  {
    versionKey: false,
  }
)

const Exercise = model("exercise", exerciseSchema)

module.exports = { exerciseSchema, Exercise }
