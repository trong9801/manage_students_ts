import mongoose, { Schema } from 'mongoose'
import  { type } from '../type/allType'

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
const subjectsDB = mongoose.model<type>('subjects', subjectsSchema)
export default subjectsDB