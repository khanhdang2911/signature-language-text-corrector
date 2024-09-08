/** @format */

import express from 'express'
import homeRouter from './home.route.js'

const router = express.Router()

router.use('/home', homeRouter)

export default router
