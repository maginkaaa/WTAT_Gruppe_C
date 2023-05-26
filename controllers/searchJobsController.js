const JobOpening = require("../models/jobOpening.module");

exports.searchForaJob = (req, res) => {
    res.render("searchJobs");
};

exports.searchJobs = async (req, res) => {

    let jobs;
    let found = false;

    console.log(JobOpening.find());

    try {
        jobs = await JobOpening.find({
            $or:
                [
                    {
                        title: req.body.title,
                        companyname: req.body.companyname,
                        location: req.body.location,
                        salary: req.body.salary,
                    }
                ]
        });
    }

    catch(e){
        return res.redirect("/job/search");
    }

    if(jobs.length > 0){
        found = true;
    }

    res.render("showJobs",
        {
            jobs,
            found
        });
};