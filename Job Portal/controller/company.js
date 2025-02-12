
const companyService =  require("../services/company")

exports.createCompany = async (req, res) => {
  try {
    const payload = req.body;
    let userId = req.user.id;
    payload.userId = userId;
    const company = await companyService.createCompany(payload);
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllCompany = async (_, res) => {
  try {
    const companies = await companyService.getAllCompany();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companyService.getCompanyById(id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedCompany = await companyService.updateCompany(id, payload);
    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: updatedCompany });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await companyService.deleteCompany(id);
    if (!deletedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.getUnverified= async (req, res) => {
  try {
      let company=await companyService.getAllUnverified()
     return res.send(company)
  } catch (error) {
    return res.status(500).json({ error: error });
  }
  }