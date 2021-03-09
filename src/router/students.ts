import express, { Router } from 'express'
import { addStudents, updateStatus, updateSudent, updateClassStudent, detailStudent, getListStudents, getListByStatus, deleteStudent } from '../controler/students'

const router : Router = express.Router()

router.post('/addStudent', addStudents)
router.put('/updateStatus', updateSudent)
router.put('/updateInforStudent', updateStatus)
router.put('/updateClass', updateClassStudent)
router.delete('/deleteStudent', deleteStudent)
router.get('/detailStudent', detailStudent)
router.get('/getListStudents', getListStudents)
router.get('/getListByStatus', getListByStatus)

export const studentsRt = router