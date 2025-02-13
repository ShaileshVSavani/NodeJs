const express = require("express");
const companyController = require("../controller/company");
const Ability = require("../middleware/Ability");
const authMiddleware = require("../middleware/decode");

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to create a new company
router.post("/create", Ability(["HR"]), companyController.createCompany);

// Route to get all companies
router.get("/", Ability(["ADMIN"]), companyController.getAllCompany);

// Route to get a single company by ID
router.get("/:id", companyController.getCompanyById);

// Route to update a company
router.patch("/:id", Ability(["ADMIN", "HR"]), companyController.updateCompany);

// Route to delete a company
router.delete("/:id",Ability(["ADMIN", "HR"]), companyController.deleteCompany);

router.get("/admin/unverified", Ability(["ADMIN"]), companyController.getUnverified);

// Route to verify a company (accessible only by ADMIN or HR)
router.patch("/verify/:id", Ability(["ADMIN", "HR"]), companyController.verifyCompany);

module.exports = router;
