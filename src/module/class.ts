import mongoose, { Schema } from 'mongoose'
import {classes} from '../type/classes'

const classSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }]
})
const classDB = mongoose.model<classes>('class', classSchema)
export default classDB