const mongoose = require("mongoose");

const jobOpeningSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    salary: { type: Number, required: true },
    location: String,
    qualifications: String,
});

const jobOpening = mongoose.model('JobOpening', jobOpeningSchema);
module.exports = jobOpening;