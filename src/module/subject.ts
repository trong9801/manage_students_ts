import mongoose, { Schema } from 'mongoose'
import { subjects } from '../type/subjects'


const subjectsSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }],
    codeSubject: {
        type: String,
        require: true
    }
})
const subjectsDB = mongoose.model<subjects>('subjects', subjectsSchema)
export default subjectsDB