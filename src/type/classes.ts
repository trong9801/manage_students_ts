import * as mongoose from 'mongoose'

export interface classes extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId,
    name: string,
    teacher : mongoose.Schema.Types.ObjectId,
    studnet  : mongoose.Schema.Types.ObjectId
}