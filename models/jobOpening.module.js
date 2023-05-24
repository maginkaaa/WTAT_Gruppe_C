const mongoose = require("mongoose");

const jobOpeningSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    company: { type: String, required: true},
    description: { type: String, required: true},
    salary: { type: Number, required: true },
    location: String,
    qualifications: String,
});

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);
module.exports = JobOpening;