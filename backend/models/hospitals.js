const { Schema } = require('mongoose');

const hospitalSchema = new Schema({
    hospitalId: { type: String },
    hospitalName: { type: String, required: true },
    address: { type: String },
    ratings: { type: Number },
    contactNo: [{ type: Number }],
    doctors: [{ type: String }]
});

const schema = mongoose.model('Hospitals', hospitalSchema)

module.exports = schema;