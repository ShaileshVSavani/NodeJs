const companyRepository = require("../repository/company");

exports.createCompany = async (payload) => {
  let company = await companyRepository.createCompany(payload);
  return company;
};
exports.getAllCompany = async () => {
  let company = await companyRepository.getAllCompany();
  return company;
};

exports.getCompanyById = async (id) => {
  let company = await companyRepository.getCompanyById(id);
  return company;
};

exports.updateCompany = async (id, payload) => {
  let company = await companyRepository.updateCompany(id, payload);
  return company;
};

exports.deleteCompany = async (id) => {
  let company = await companyRepository.deleteCompany(id);
  return company;
};
