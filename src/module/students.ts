import mongoose, {Schema} from 'mongoose'
import {students} from '../type/students'


const studentsSchema: Schema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    nameClass: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'class'
    },
    age : Number,
    codeStudents : {
        type : String,
        require :true
    },
    status: Number
})
const studentsDB = mongoose.model<students>('students', studentsSchema);

export default studentsDB