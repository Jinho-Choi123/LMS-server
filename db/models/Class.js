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


const classSchema = new mongoose.Schema({
    instructor: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    students: { type: [String], required: true },
    joinPassword: { type: String, required: true },
    lectureDates: { type: [Date], required: true },
    notices: { type: [noticeSchema] },
    lectureContents: { type: [lectureContentSchema] },
    assignments: { type: [String], required: true } // store array of assignment ids
})

module.exports = mongoose.model('Lecturecontent', lectureContentSchema);

module.exports = mongoose.model('Class', classSchema);