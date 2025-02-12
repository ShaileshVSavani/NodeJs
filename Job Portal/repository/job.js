
const Job = require("../model/job");

// Create a new job document
exports.createJob = async (data) => {
  const job = await Job.create(data);
  return job;
};

// Retrieve all jobs 
exports.getAllJobs = async () => {
  const jobs = await Job.find();
  return jobs;
};

// Retrieve all jobs matching a query
exports.getAllJobsByQuery = async (query) => {
  const jobs = await Job.find(query);
  return jobs;
};

// Retrieve a job by its ID
exports.getJobById = async (id) => {
  const job = await Job.findById(id);
  return job;
};

// Retrieve all jobs for a specific company ID
exports.getJobsByCompanyId = async (companyId) => {
  const jobs = await Job.find({ companyId });
  return jobs;
};

// Update a job by its ID and return the updated document
exports.updateJob = async (id, data) => {
  const job = await Job.findByIdAndUpdate(id, data, { new: true });
  return job;
};

// Delete a job by its ID
exports.deleteJob = async (id) => {
  const job = await Job.findByIdAndDelete(id);
  return job;
};
