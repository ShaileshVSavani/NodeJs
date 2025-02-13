const express = require("express");
const ApplicationController = require("../controller/application");

const router = express.Router();

router.get("/", ApplicationController.getAllApplications);
router.post("/", ApplicationController.createApplication);
router.patch("/:id", ApplicationController.updateApplication);
router.get("/user/:userId", ApplicationController.getApplicationsByUserId);
router.get("/job/:jobId", ApplicationController.getApplicationsByJobId);

module.exports = router;
