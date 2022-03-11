const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    userId: { type: String },
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    contact: { type: String, unique: true },
    aadhaarProof: { type: String },
    panProof: { type: String },
    aadhaarNumber: { type: String },
    panNumber: { type: String },
    isVerified: { type: Boolean, default: false }
});

const schema = mongoose.model('User', userSchema);

module.exports = schema;