import mongoose, {Schema} from 'mongoose'
import  { type } from '../type/allType'
import {score} from '../type/score'

const scoresSchema :Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'students',
        require: true
    },
    subjects :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subject',
        require : true
    },
    scores : {
        type : Number,
        require : true
    }
})
const scoresDb = mongoose.model<score>('score', scoresSchema)
export default scoresDb