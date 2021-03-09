import * as mongoose from 'mongoose'

export interface subjects extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId[],
    name: string,
    teacher: mongoose.Schema.Types.ObjectId[],
    codeSubject: string
}