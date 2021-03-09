import * as mongoose from 'mongoose'
import * as express from 'express'
import { students } from '../type/students'
import { classes } from '../type/classes'
import { pagination } from '../type/pagination'
import studentsDB from '../module/students'
import classDB from '../module/class'


export const paginations = async (data: pagination) => {
    const curentPage = data.page || 1
    const perPage = data.perPage || 5
    let query
    if (data.db == 'student') {
        query = studentsDB.find()
    }
    if (data.db == 'class') {
        query = classDB.find()
    }
    
    const totalDoc: any  = await query
    if(!totalDoc[0]){
        throw new Error('danh sach trong')
    }
    const listDoc = await query?.populate({ path: `${data.path}`, select: `${data.select}`})?.sort(data.sort)
        .skip((curentPage * perPage) - perPage)
        .limit(perPage)
    const result = {
        curentPage: curentPage,
        data : listDoc,
        lastPage: Math.ceil(totalDoc.length/perPage),
        perPage : perPage
    }
    return result
}