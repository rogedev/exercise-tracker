const { Schema, model } = require("mongoose")

const exerciseSchema = new Schema(
  {
    description: String,
    duration: String,
    date: String,
    created_at: Date,
  },
  {
    versionKey: false,
  }
)

const Exercise = model("exercise", exerciseSchema)

module.exports = { exerciseSchema, Exercise }
