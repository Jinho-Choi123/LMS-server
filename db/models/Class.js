const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
})

const lectureContentSchema = new mongoose.Schema({
    lectureDate: { type: Date, required: true },
    storePath: { type: String, required: true },
    fileName: { type: String, required: true }
})

const quizScema = new mongoose.Schema({
    quizName: { type: String, required: true },
    quizUrl: { type: String, required: true },
    openTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
})

const submitSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    lastSubmitTime: { type: Date, required: true }
})

const assignmentSchema = new mongoose.Schema({
    assignmentId: { type: String, required: true },
    assignmentName: { type: String, required: true },
    openTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    submitPath: { type: String, required: true },
    submitStatus: { type: [submitSchema], required: true },
    instruction: { type: String, required: true }
})


const classSchema = new mongoose.Schema({
    instructor: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    students: { type: [String], required: true },
    joinPassword: { type: String, required: true },
    lectureDates: { type: [Date], required: true },
    notices: { type: [noticeSchema] },
    lectureContents: { type: [lectureContentSchema] },
    assignments: { type: [assignmentSchema] }
})

classSchema.methods.submitAssignment = (info) => {
    this.assignments.push({
        userId: info.userId,
        fileName: info.fileName,
        lastSubmitTime: info.lastSubmitTime
    })
    return this.save();
}

module.exports = mongoose.model('Lecturecontent', lectureContentSchema);

module.exports = mongoose.model('Class', classSchema);