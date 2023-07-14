const JobOpening = require("../models/jobOpening.module");
const jobNotificationController = require("./jobNotificationController");

exports.jobNotification = (req, res) => {
  res.render("jobNotification");
}

exports.addJob = (req, res) => {
  res.render("addJob");
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobOpening.find();

    if (req.query.format === "json") {
      return res.json(jobs); // respond with JSON
    }

    res.render("adminJobList", {
      jobs: jobs
    });
  } catch (error) {
    console.log(`Error fetching all jobs: ${error.message}`);
    res.redirect("/");
  }
};

exports.saveJob = async (req, res) => {
  const query = await JobOpening.findOne({ title: req.body.title });
  if (query != null)
    return res.redirect("/jobs/add");

  const newJob = new JobOpening({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    salary: req.body.salary,
    location: req.body.location,
    qualifications: req.body.qualifications,
  });

  try {
    await newJob.save();
    res.render("jobDetail", {
      job: newJob,
      added: true,
    });
    jobNotificationController.sendNotification(newJob);
  } catch (error) {
    console.log(`Error saving job: ${error.message}`);
    res.redirect("/jobs/add");
  }
};

exports.getJobInfo = async (req, res) => {
  try {
    const jobs = await JobOpening.find();
    const id = req.params.id;
    const job = await JobOpening.findById(id);

    if (!job) {
      throw new Error("Job not found");
    }

    if (req.query.format === "json") {
      return res.json(job); // respond with JSON
    }

    res.render("jobDetail", {
      job: job,
      jobs: jobs,
      added: false,
    });
  } catch (error) {
    console.log(`Error fetching job details: ${error.message}`);
    res.redirect("/job/search");
  }
};

exports.searchForaJob = (req, res) => {
  res.render("searchJobs");
};

exports.searchJobs = async (req, res) => {
  try {
    const { title, company, location, salary } = req.body;

    const searchParams = {};

    if (title) {
      searchParams.title = title;
    }

    if (company) {
      searchParams.company = company;
    }

    if (location) {
      searchParams.location = location;
    }

    if (salary) {
      searchParams.salary = salary;
    }

    const jobs = await JobOpening.find({ $or: [searchParams] });
    const found = jobs.length > 0;

    res.render("showJobs", {
      jobs: jobs,
      found: found,
    });
  } catch (error) {
    console.log(`Error searching for jobs: ${error.message}`);
    res.redirect("/jobs/search");
  }
};


exports.deleteJob = async (req, res) => {
  const id = req.params.id;
  try {
    await JobOpening.findByIdAndRemove(id);
    console.log(`Deleting Job by ID was successfully`);
    res.redirect("/admin/jobs");
  } catch (error) {
    console.log(`Error deleting Job by ID: ${error.message}`);
  }
};

exports.editJob = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await JobOpening.findById(id);
    res.render("jobEdit", { job: job });
  } catch (error) {
    console.log(`Error fetching Job by ID: ${error.message}`);

  }
};

exports.updateJob = async (req, res) => {
  const id = req.params.id;
  const jobParams = {
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    salary: req.body.salary,
    location: req.body.location,
    qualifications: req.body.qualifications,
  };
  try {
    await JobOpening.findByIdAndUpdate(id, { $set: jobParams });
    console.log(`Updating Job by ID was successfully`);
    res.redirect(`/jobs/${id}`);
  } catch (error) {
    console.log(`Error updating Job by ID: ${error.message}`);
  }
};
