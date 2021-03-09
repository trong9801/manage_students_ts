import * as mongoose from 'mongoose'
import classDB from '../module/class'
import studentsDB from '../module/students'
import { pagination } from '../type/pagination'

export const paginationBy = async (data: pagination) => {
    const curentPage = data.page || 1
    const perPage = data.perPage || 5
    let query
    if (!data.slelectBy) {
        throw new Error('nhap truong muon tim kiem')
    }
    if (data.db == 'student') {
        query = studentsDB.find(data.slelectBy)
    }
    if (data.db == 'class') {
        query = classDB.find(data.slelectBy)
    }

    const totalDoc: any = await query
    if (!totalDoc[0]) {
        throw new Error('danh sach trong')
    }
    const listDoc = await query?.populate({ path: `${data.path}`, select: `${data.select}` })?.sort(data.sort)
        .skip((curentPage * perPage) - perPage)
        .limit(perPage)
    const result = {
        curentPage: curentPage,
        data: listDoc,
        lastPage: Math.ceil(totalDoc.length / perPage),
        perPage: perPage
    }
    return result
}