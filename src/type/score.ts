import * as mongoose from 'mongoose'

export interface score extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId,
    student: mongoose.Schema.Types.ObjectId,
    subjects: mongoose.Schema.Types.ObjectId,
    scores: Number,
}