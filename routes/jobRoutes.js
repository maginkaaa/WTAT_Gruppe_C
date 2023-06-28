const router = require("express").Router(), 
jobController = require("../controllers/jobController");

router.delete("/jobs/:id/delete", jobController.deleteJob);

router.get("/jobs/:id", jobController.getJobInfo);
router.get("/job/add", jobController.addJob);
router.get("/job/search", jobController.searchForaJob);
router.get("/admin/jobs", jobController.getAllJobs);
router.get("/jobs/:id/edit", jobController.editJob);

router.put("/jobs/:id/update", jobController.updateJob);

router.post("/job/add", jobController.saveJob);
router.post("/job/search", jobController.searchJobs);

module.exports = router;