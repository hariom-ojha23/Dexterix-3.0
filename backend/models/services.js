const { Schema } = require('mongoose');

const serviceSchema = new Schema({
    serviceId: { type: String },
    name: { type: String },
    field: { type: String },
    cost: { type: Number },
    hospitalId: { type: String },
    doctors: [{ type: String }]
});

const schema = mongoose.model('Service', serviceSchema)

module.exports = schema;