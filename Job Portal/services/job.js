const jobRepository = require("../repository/job");
const { getCompanyById } = require("../repository/company");

// exports.create = async (data) => {
//   try {
//     // Check if the company exists and is verified
//     const company = await getCompanyById(data.companyId);
//     if (company && company.isVerified) {
//       // Use the repository to create the job record
//       const job = await jobRepository.createJob(data);
//       return job;
//     } else {
//       throw new Error("Unverified company");
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

//=================================================
// exports.create = async (data) => {
//   try {
//     // Check if the company exists and is verified
//     const company = await getCompanyById(data.companyId);
//     if (company && company.isVerified) {
//       // Use the repository to create the job record
//       const job = await jobRepository.createJob(data);
//       return job;
//     } else {
//       throw new Error("Unverified company");
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };


//=========================================

exports.create = async (data) => {
  try {
    // Retrieve the company by ID
    const company = await getCompanyById(data.companyId);
    
    // Check if the company exists
    if (!company) {
      throw new Error("Company not found");
    }
    
    // Check if the company is verified
    if (!company.isVerified) {
      throw new Error("Unverified company");
    }
    
    // If verified, create the job record
    const job = await jobRepository.createJob(data);
    return job;
  } catch (error) {
    // Forward the error so that the controller can handle it
    throw new Error(error.message);
  }
};


exports.getAll = async () => {
  try {
    const jobs = await jobRepository.getAllJobs();
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllByQuery = async (query) => {
  try {
    // **Improvement:** Call the repository function that accepts a query.
    const jobs = await jobRepository.getAllJobsByQuery(query);
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getJobById = async (id) => {
  try {
    const job = await jobRepository.getJobById(id);
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllByCompanyId = async (companyId) => {
  try {
    const jobs = await jobRepository.getJobsByCompanyId(companyId);
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (id, data) => {
  try {
    const job = await jobRepository.updateJob(id, data);
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

exports.delete = async (id) => {
  try {
    const job = await jobRepository.deleteJob(id);
    return job;
  } catch (error) {
    throw new Error(error);
  }
};
