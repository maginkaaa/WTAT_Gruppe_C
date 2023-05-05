exports.getJobInfo= (req, res) => {
    let id = req.params.id;
    let jobtitle = "Software Developer";
    let companyname = "HTW";
    let location = "Berlin" ;
    let salary = "3500" ;
    let requirements = "Bachelor of Science" ;
    res.render(`jobDetail`,
        {
            jobtitle: jobtitle ,
            companyname: companyname,
            location: location,
            salary: salary,
            requirements: requirements }
    );
};