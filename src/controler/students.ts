import express from 'express'
import classDB from '../module/class'
import studentsDB from '../module/students'
import * as mongoose from 'mongoose'
import { pagination } from '../type/pagination'
import { paginations } from '../hander/pagination'
import { paginationBy } from '../hander/paginationBy'
import { checkCodeStudents } from '../validation/students'


export const addStudents = async (req: express.Request, res: express.Response): Promise<object> => {
    const codeStudent = req.body.codeStudent;
    const nameClass: string = req.body.nameClass;
    try {
        checkCodeStudents(codeStudent)
        const findStudent = await studentsDB.findOne({ codeStudents: codeStudent })
        const finndIdClass = await classDB.findOne({ name: nameClass })
        // console.log(finndIdClass)
        if (findStudent) {
            throw new Error('tai khoan da ton tai')
        }
        if (!finndIdClass) {
            throw new Error('lop khong ton tai')
        }
        const newStudent = {
            _id: new mongoose.Types.ObjectId,
            ...req.body,
            codeStudents: codeStudent,
            nameClass: finndIdClass?._id
        }
        // console.log(newStudent)
        await studentsDB.create(newStudent)
        return res.json({
            result: {
                status: 'thanh cong',
                data: {
                    ...newStudent
                },
                message: ""
            }
        })
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}

export const updateStatus = async (req: express.Request, res: express.Response) => {
    try {
        const codeStudent = req.query.codeStudent;
        checkCodeStudents(codeStudent)
        const findStudent = await studentsDB.findOne({ codeStudents: codeStudent })
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai')
        }
        const updateStatus = {
            ...req.body,
            codeStudent: codeStudent,
        }
        await studentsDB.findByIdAndUpdate(findStudent?._id, updateStatus)
        return res.json({
            result: {
                status: 'thanh cong',
                message: ''
            }
        })
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}

export const updateSudent = async (req: express.Request, res: express.Response): Promise<object> => {
    try {
        const codeStudent = req.query.codeStudent;
        checkCodeStudents(codeStudent)
        const findStudent = await studentsDB.findOne({ codeStudents: codeStudent })
        if (!findStudent) {
            throw new Error('tai khoan khong ton tai')
        }
        const updateInforStudent = {
            ...req.body,
            codeStudent: codeStudent,
        }
        await studentsDB.findByIdAndUpdate(findStudent?._id, updateInforStudent)

        // console.log(updateInforStudent)
        return res.json({
            result: {
                status: 'thanh cong',
                data: {
                    ...req.body
                },
                message: ''
            }
        })
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: {
                    ...req.body
                },
                message: err.message
            }
        })
    }
}

export const updateClassStudent = async (req: express.Request, res: express.Response): Promise<object> => {
    try {
        const codeStudent = req.query.codeStudent
        const nameClass: string = req.body.nameClass
        const findStudent = await studentsDB.findOne({ codeStudents: codeStudent }).populate({ path: 'nameClass', select: 'name' })
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai')
        }
        const findClass = await classDB.findOne({ name: nameClass })
        if (!findClass) {
            throw new Error('lop khong ton tai')
        }
        const update = findStudent
        update.nameClass = findClass._id
        // console.log(findStudent)
        await studentsDB.findByIdAndUpdate(findStudent._id, update)
        return res.json({
            result: {
                status: "thanh cong",
                data: update,
                message: ''
            }
        })


    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}

export const detailStudent = async (req: express.Request, res: express.Response): Promise<object> => {
    try {
        const codeStudent = req.query.codeStudent
        checkCodeStudents(codeStudent)
        const detailStudent = await studentsDB.findOne({ codeStudents: codeStudent }).populate({ path: 'nameClass', select: 'name' })
        if (detailStudent) {
            return res.json({
                result: {
                    status: 'thanh cong',
                    data: detailStudent,
                    message: ''
                }
            })
        } else {
            throw new Error('tai khoan khong ton tai')
        }
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: {},
                message: err.message
            }
        })
    }
}

export const getListByStatus = async (req: express.Request, res: express.Response) => {
    try {
        let perPage: any = req.query.perPage
        perPage = parseInt(perPage) || 3;
        let page: any = req.query.page;
        page = parseInt(page) || 1
        const status = req.query.status
        // console.log(status)
        const list: pagination = {
            db: 'student',
            page: page,
            perPage: perPage,
            sort: { codeStudents: 'asc' },
            slelectBy: { status: status },
            select : 'name',
            path : 'nameClass'
        }
        const data = await paginationBy(list)
        return res.json({ result: data })
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: {},
                message: err.message
            }
        })
    }
}

export const getListStudents = async (req: express.Request, res: express.Response): Promise<object> => {
    try {
        let perPage: any = req.query.perPage
        perPage = parseInt(perPage) || 3;
        let page: any = req.query.page;
        page = parseInt(page) || 1

        const list: pagination = {
            db: 'student',
            page: page,
            perPage: perPage,
            sort: { codeStudents: 'asc' }
            // select : 'name',
            // path : 'nameClass'
        }
        const data = await paginations(list)
        return res.json({ result: data })
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}

export const deleteStudent = async (req: express.Request, res: express.Response): Promise<object> => {
    try {
        const codeStudent = req.query.codeStudent;
        checkCodeStudents(codeStudent)
        const findStudent = await studentsDB.findOne({ codeStudents: codeStudent })
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai')
        }
        await studentsDB.findByIdAndDelete(findStudent._id)
        return res.json({
            result: {
                status: 'thanh cong',
                message: ''
            }
        })
    } catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}

