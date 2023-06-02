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
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            salary: req.body.salary,
            qualifications: req.body.qualifications,
            description: req.body.description,
            added: true,
         });
  };

  exports.getJobInfo= (req, res) => {
      let id = req.params.id;
      let title = "Software Developer";
      let company = "HTW";
      let location = "Berlin" ;
      let salary = "3500" ;
      let qualifications = "Bachelor of Science";
      let description = "...";
      res.render(`jobDetail`,
          {
              title: title,
              company: company,
              location: location,
              salary: salary,
              qualifications: qualifications,
              description: description,
              added: false,
           }
      );
  };

  exports.searchForaJob = (req, res) => {
      res.render("searchJobs");
  };

  exports.searchJobs = async (req, res) => {

      let jobs;
      let found = false;

      try {
          jobs = await JobOpening.find({
              $or:
                  [
                      {
                          title: req.body.title,
                          company: req.body.company,
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
