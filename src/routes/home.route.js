/** @format */

import express from 'express'
import * as homeController from '../controllers/home.controller.js'
const homeRouter = express.Router()

homeRouter.get('/get-all-history', homeController.getAllHistory)
homeRouter.post('/create-text-voice', homeController.createTextVoice)
homeRouter.delete('/delete-text-voice/:id', homeController.deleteTextVoice)
homeRouter.put('/update-text-voice',homeController.updateTextVoice)
export default homeRouter
