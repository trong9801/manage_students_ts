import * as mongoose from 'mongoose'

export interface teachers extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    codeTeacher : any,
    class: mongoose.Schema.Types.ObjectId[],
    subjects : mongoose.Schema.Types.ObjectId[]
}