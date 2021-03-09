import express from 'express'
import bodyParser from 'body-parser'

import {studentsRt} from './students'
import {classRt} from './class'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/students', studentsRt)
app.use('/class', classRt)

export default app