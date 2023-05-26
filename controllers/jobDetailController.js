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