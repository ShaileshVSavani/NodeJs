const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      // required: true,
      minlength: 4,
    },
    profile_picture: String,
    number: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    role: {
      type: String,
      enum: ["ADMIN", "HR", "CANDIDATE"],
      default: "CANDIDATE",
    },
    isActive: { type: Boolean, default: true },
    isVarified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;