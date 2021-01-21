const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
})

const classSchema = new mongoose.Schema({
    instructor: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    students: { type: [String], required: true },
    joinPassword: { type: String, required: true },
    lectureDate: { type: [Date], required: true },
    notices: { type: [noticeSchema] }

})

module.exports = mongoose.model('Class', classSchema);