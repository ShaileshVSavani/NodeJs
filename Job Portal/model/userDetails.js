// const mongoose = require("mongoose");

// const userDetailsSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     skills: [{ type: String, trim: true }],
//     exp: [
//       {
//         company: { type: String, required: true },
//         role: { type: String, required: true },
//         duration: { type: String, required: true },
//         description: { type: String },
//       },
//     ],
//     edu: [
//       {
//         institute: { type: String, required: true },
//         degree: { type: String, required: true },
//         title: { type: String },
//         year: { type: Number, required: true },
//       },
//     ],
//     resume: { type: String, trim: true },
//     status: { type: String, enum: ["exp", "fresher"], required: true },
//   },
//   { timestamps: true }
// );

// const UserDetails = mongoose.model("UserDetails", userDetailsSchema);




const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  jobTitle: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  jobDescription: { type: String, trim: true },
  jobStatus: { type: String, enum: ["completed", "running"] },
});

const educationSchema = new mongoose.Schema({
  institutionName: { type: String, required: true, trim: true },
  degree: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  educationStatus: { type: String, enum: ["completed", "running"] },
});

const userProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: [{ type: String, trim: true }],
    workExperiences: [workExperienceSchema],
    education: [educationSchema],
    resumeUrl: { type: String},
    experienceLevel: {type: String, enum: ["experienced", "fresher"], required: true},
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userProfileSchema);
module.exports = UserDetails;
