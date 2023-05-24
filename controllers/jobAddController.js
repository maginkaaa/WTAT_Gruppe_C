const JobOpening = require("../models/jobOpening.module");

exports.addJob = (req, res) => {
    res.render("addJob");
};

exports.saveJob = async (req, res) => {
    const query = await JobOpening.findOne({title: req.body.title});
    if (query != null)
        return res.redirect("/job/add");

    let newJob = new JobOpening({
        title: req.body.title,
        company: req.body.company,
        description: req.body.description,
        salary: req.body.salary,
        location: req.body.location,
        qualifications: req.body.qualifications,
    });
  
    await newJob.save()
    res.render("jobDetail", 
        {
            jobtitle: req.body.title,
            companyname: req.body.company,
            location: req.body.location,
            salary: req.body.salary,
            requirements: req.body.qualifications,
            description: req.body.description,
            added: true,
         });
  };