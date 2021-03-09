import mongoose, { Schema } from 'mongoose'
import  { type } from '../type/allType'

const teacherSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
        require: true
    }],
    age: Number,
    codeTeacher: {
        type: String,
        require: true
    },
    subjects: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subjects'
    }]
})
const teacherDB = mongoose.model<type>('teachers', teacherSchema)
export default teacherDB