const express = require("express");
const companyController = require("../controller/company");
const Ability = require("../middleware/Ability");

const router = express.Router();

// Route to create a new company
router.post("/create", Ability(["HR"]), companyController.createCompany);

// Route to get all companies
router.get("/", Ability(["ADMIN"]), companyController.getAllCompany);

// Route to get a single company by ID
router.get("/:id", companyController.getCompanyById);

// Route to update a company
router.put("/:id", Ability(["ADMIN", "HR"]), companyController.updateCompany);

// Route to delete a company
router.delete("/:id",Ability(["ADMIN", "HR"]), companyController.deleteCompany
);

module.exports = router;
