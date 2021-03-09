import express, { Router } from 'express'
import {addClass, getListClass} from '../controler/class'


const router : Router = express.Router()

router.post('/addClass', addClass)
router.get('/getListClass', getListClass)

export const classRt = router