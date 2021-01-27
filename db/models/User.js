const mongoose = require('mongoose');

const userAssignmentSchema = new mongoose.Schema({
    assignmentId:{ type: String, required: true },
    assignmentName:{ type: String, required: true },
    progress:{type:String, required:true},
    endTime: { type: Date, required: true }
})

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    lectureIn: { type: [String], required: true },
    assignments:{type: [userAssignmentSchema]}
})

module.exports = mongoose.model('User', userSchema);