const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: [{ type: String, trim: true }],
    exp: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String },
      },
    ],
    edu: [
      {
        institute: { type: String, required: true },
        degree: { type: String, required: true },
        title: { type: String },
        year: { type: Number, required: true },
      },
    ],
    resume: { type: String, trim: true },
    status: { type: String, enum: ["exp", "fresher"], required: true },
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
