import studentsDB from '../module/students'
import classDB from '../module/class'
import * as mongoose from 'mongoose'


export const checkExist = async(DB : string, propertyValue : any , boolean: boolean )=>{
    let a = []
    if(DB =='student'){
        const findStudent = await studentsDB.findOne({codeStudents : propertyValue})
        a.push(findStudent?._id)
    }
    if(DB =='class'){
        const findclass = await classDB.findOne({name : propertyValue})   
        a.push(findclass?._id)
    }
    if(boolean){
        if(a[0]){
            throw new Error(`alo ${DB} lop da ton tai`)
        }
    }else{
        if(!a[0]){
            throw new Error(`${DB} khong ton tai`)
        }
    } 
}