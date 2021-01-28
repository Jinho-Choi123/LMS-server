const mongoose = require('mongoose');

const userAssignmentSchema = new mongoose.Schema({
    assignmentId:{ type: String, required: true },
    assignmentName:{ type: String, required: true },
    progress:{type:String, required:true},
    endTime: { type: Date, required: true }
})

const userQuizSchema = new mongoose.Schema({
    quizId: {type: String, required: true},
    quizName: {type: String, required: true},
    openTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    progress: {type: Boolean, required: true}
})

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    lectureIn: { type: [String], required: true },
    assignments:{type: [userAssignmentSchema]},
    quizes: {type: [userQuizSchema]}
})

module.exports = mongoose.model('User', userSchema);