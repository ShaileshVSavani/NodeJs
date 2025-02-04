const express = require("express");
const companyController = require("../controller/company");

const router = express.Router();

// Route to create a new company
router.post("/create", companyController.createCompany);

// Route to get all companies
router.get("/", companyController.getAllCompany);

// Route to get a single company by ID
router.get("/:id", companyController.getCompanyById);

// Route to update a company
router.put("/:id", companyController.updateCompany);

// Route to delete a company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
