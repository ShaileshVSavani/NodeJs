const Company = require("../model/company");

exports.createCompany = async (payload) => {
  let company = await Company.create(payload);
  return company;
};
exports.getAllCompany = async (query) => {
  let company = await Company.find(query);
  return company;
};

exports.getCompanyById = async (id) => {
  let company = await Company.findById(id);
  return company;
};

exports.updateCompany = async (id, payload) => {
  let company = await Company.findByIdAndUpdate(id, payload, { new: true });
  return company;
};

exports.deleteCompany = async (id) => {
  let company = await Company.findByIdAndDelete(id);
  return company;
};


exports.verifyCompany = async (companyId) => {
  // Find the company by ID
  const company = await Company.findById(companyId);
  if (!company) {
    throw new Error("Company not found");
  }
  // If already verified, return it as-is
  if (company.isVerified) {
    return company;
  }
  // Otherwise, mark it as verified
  company.isVerified = true;
  const updatedCompany = await company.save();
  return updatedCompany;
};
