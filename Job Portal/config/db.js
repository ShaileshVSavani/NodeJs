const  mongoose  = require("mongoose")
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL 
const connectDB = async () => {
   try {
     await mongoose.connect(MONGODB_URL);
     console.log('MongoDB connected...');
   } catch (error) {
       console.error(`Error connecting to MongoDB: ${error.message}`);
     process.exit(1);
   }
}

module.exports = connectDB;







// 1. **Repository Layer:**
//    - **Purpose:** Contains direct database interactions (e.g., `createJob`, `getAllJobs`, etc.) with the Job model.
//    - **Example:** In `repository/job.js`, functions like `createJob` and `updateJob` directly interact with the database.

// 2. **Service Layer:**
//    - **Purpose:** Implements business logic and validations. It calls the repository layer to perform the actual database operations.
//    - **Example:** In `service/job.js`, the `create` function checks if the company is verified by calling `getCompanyById` from the company repository before using `jobRepository.createJob` to create a new job.

// 3. **Controller Layer:**
//    - **Purpose:** Handles HTTP requests and responses. It calls the service layer to perform business operations.
//    - **Example:** In `controller/job.js`, the `createJob` controller method receives the request, attaches necessary properties (like `req.body.userId`), and then calls `jobService.create` to handle job creation.

// ### Flow Summary

// - **Controller** receives an HTTP request and calls the **Service**.
// - **Service** performs necessary business logic (such as validating the company status) and then calls the **Repository**.
// - **Repository** executes the database operation and returns the result.
// - The result flows back up from the **Repository** to the **Service** and then to the **Controller**, which sends the final HTTP response.

// This separation ensures your code is modular, maintainable, and follows good design practices.





// https://exultant-increase-859.notion.site/job-portal-18be3d4ae6f2808a8ec2e3f42de4a832

// # job portal

// tables 

// user → ["ADMIN", "HR", "CANDIDATE"],

// CANDIDATE Details → …

// ```jsx
// const { default: mongoose } = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     password: String,
//     profile_picture: String,
//     number: String,
//     role: {
//       type: String,
//       enum: ["ADMIN", "HR", "CANDIDATE"],
//       default: "CANDIDATE",
//     },
//     isActive: { type: Boolean, default: true },
//     isVerified: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );

// ```

// # User Methods : -

// - [x]  create →mail verify
// - [x]  login
// - [x]  update
// - [x]  delete →active →false
// - [x]  getById
// - [x]  getAllUser

// details 

// ```
// const mongoose = require("mongoose");

// const workExperienceSchema = new mongoose.Schema(
//   {
//     companyName: { type: String, required: true, trim: true },
//     jobTitle: { type: String, required: true, trim: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date },
//     jobDescription: { type: String, trim: true },
//     jobStatus: { type: String, enum: ["completed", "running"] },
//   },
//   { _id: false }
// );

// const educationSchema = new mongoose.Schema(
//   {
//     institutionName: { type: String, required: true, trim: true },
//     degree: { type: String, trim: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date },
//     educationStatus: { type: String, enum: ["completed", "running"] },
//   },
//   { _id: false }
// );

// const userProfileSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     skills: [{ type: String, trim: true }],
//     workExperiences: [workExperienceSchema],
//     educationHistory: [educationSchema],
//     resumeUrl: { type: String, trim: true },
//     experienceLevel: { type: String, enum: ["experienced", "fresher"], required: true },
//   },
//   { timestamps: true }
// );

// const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

// ```

// details methods

// - [x]  getByUserId
// - [x]  creaate
// - [x]  update

// # company model

// ```
// const mongoose = require("mongoose");

// const companySchema = new mongoose.Schema({
//   companyName: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   number: {
//     type: Number,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Company = mongoose.model("Company", companySchema);
// module.exports = Company;
// ```

// ## methods

// - [x]  create →email →admin
// - [x]  getAll
// - [x]  getById
// - [x]  update
// - [x]  delete
// - [ ]  verification methods

// # job posting

// ```jsx
// const { default: mongoose } = require("mongoose");
// const jobSchema = new mongoose.Schema({
//     title: {
//       type: String,
//       required: true,
//     },
//     jobType: {
//       type: String,
//       enum: ["parttime", "fullTime"],
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     salary: {
//       type: String,
//     },
//     requiredSkills: {
//       type: [String],
//       required: true,
//     },
//     desc: {
//       type: String,
//       required: true,
//     },
//     requiredExp: {
//       type: String,
//       required: true,
//     },
//       endDate: { type: Date,  required: true, },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     companyId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       required: true,
//     },
//   });
  
//   const Job = mongoose.model("Job", jobSchema);
//   module.exports = Job;
// ```

// # methods

// - [x]  create
// - [x]  getAll →with queries
// - [x]  getById
// - [x]  getActiveJobs
// - [x]  update
// - [x]  delete

// ```jsx
// const express = require("express");
// const router = express.Router();

// const jobController=require("../controller/job")
// // Create a new job
// router.post("/", jobController.createJob);

// // Get all jobs
// router.get("/", jobController.getAllJobs);

// // Get a job by ID
// router.get("/:id", jobController.getJobById);

// // Get all jobs by company ID
// router.get("/company/:companyId", jobController.getJobsByCompanyId);

// // Update a job by ID
// router.put("/:id", jobController.updateJob);

// // Delete a job by ID
// router.delete("/:id", jobController.deleteJob);

// module.exports = router;

// ```

// # Applications

// ```jsx
// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema(
//   {
//     jobId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Job",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
//       default: "Applied",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Application = mongoose.model("Application", applicationSchema);

// module.exports = Application;

// ```

// # methods

// - [ ]  create →candidate
// - [ ]  update →HR
// - [ ]  getAll →admin
// - [ ]  getAllByCompanyId →HR (queries)
// - [ ]  getAllByJobId→ (queries)

// baseurl /token/otp