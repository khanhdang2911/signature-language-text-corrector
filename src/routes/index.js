/** @format */

import express from 'express'
import homeRouter from './home.route.js'
import learnSignatureRouter from './learnSignature.route.js'
import userRouter from './user.router.js'
const router = express.Router()

router.use('/home', homeRouter)
router.use('/learn-signature', learnSignatureRouter)
router.use('/user', userRouter)
export default router
