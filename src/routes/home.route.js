/** @format */

import express from 'express'
import * as homeController from '../controllers/home.controller.js'
const homeRouter = express.Router()

homeRouter.get('/get-all-history', homeController.getAllHistory)
homeRouter.post('/create-text-voice', homeController.createTextVoice)

export default homeRouter
