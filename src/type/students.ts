import * as mongoose from 'mongoose'

export interface students extends mongoose.Document{
    _id : mongoose.Schema.Types.ObjectId,
    name ?: string,
    nameClass ?: mongoose.Schema.Types.ObjectId,
    codeStudents ?: any,
    age ?: number,
   
}