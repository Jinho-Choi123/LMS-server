const mongoose = require('mongoose');

const submitSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    lastSubmitTime: { type: Date, required: true },
    storePath: { type: String, required: true },
    storeName: { type: String, required: true }
})

const assignmentSchema = new mongoose.Schema({
    assignmentId: { type: String, required: true },
    assignmentName: { type: String, required: true },
    openTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    submitPath: { type: String, required: true },
    submitStatus: { type: [submitSchema] },
    instruction: { type: String, required: true }
})

module.exports = mongoose.model('Assignment', assignmentSchema);