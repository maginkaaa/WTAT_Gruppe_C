const router = require("express").Router(),
jobController = require("../controllers/jobController");
jobNotificationController = require("../controllers/jobNotificationController");

router.delete("/:id/delete", jobController.deleteJob);

router.get("/add", jobController.addJob);
router.get("/search", jobController.searchForaJob);
router.get("/admin/jobs", jobController.getAllJobs);
router.get("/:id", jobController.getJobInfo);
router.get("/:id/edit", jobController.editJob);
router.get("/notification", jobNotificationController.jobNotification);

router.put("/:id/update", jobController.updateJob);

router.post("/add", jobController.saveJob);
router.post("/search", jobController.searchJobs);

module.exports = router;
