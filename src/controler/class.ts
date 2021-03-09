import classDB from '../module/class'
import express from 'express'
import mongoose from 'mongoose';



export const addClass = async(req : express.Request, res: express.Response)=>{
    try {
        const nameClass = req.body.name;
        const findNameClass = await classDB.findOne({name : nameClass})
        // console.log(findNameClass)
        if(findNameClass){
            throw new Error('lop da ton tai')
        }else{
            const newClass = {
                _id : new mongoose.Types.ObjectId(),
                name : nameClass
            }
            // console.log(newClass)
            await classDB.create(newClass)
            return res.json({
                resuilt:{
                    status: 'thanh cong',
                    data: {
                        ...req.body
                    },
                    message: ''
                }
            })
        }
    } catch (err) {
        return res.json({
            result:{
                status: 'that bai',
                message : err.message
            }
        })
    }
}
export const getListClass = async (req: express.Request, res: express.Response) => {
    try {
        const listClass = await classDB.find()
        // console.log(listClass[0])
        if(listClass[0]){
            return res.json({
                result: {
                    status: 'thanh cong',
                    data: listClass
                }
            })
        }else{
            throw new Error('danh sach trong')
        }
    } catch (err) {
        return res.json({
            resuilt: {
                status: 'that bai',
                message: err.message
            }
        })
    }
}