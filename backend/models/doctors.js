const { default: mongoose } = require('mongoose');
const { Schema } = require('mongoose');

const doctorSchema = new Schema({
    doctorId: { type: String },
    name: { type: String },
    qualification: { type: String },
    field: { type: String },
    experience: { type: Number },
    hospitalId: { type: String }
})

const schema = mongoose.model('Doctors', doctorSchema)

module.exports = schema;