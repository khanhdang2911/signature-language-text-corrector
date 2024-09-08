/** @format */

import express from 'express'
import dotenv from 'dotenv'
import connection from './config/database.js'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()

const app = express()

// PORT
const PORT = process.env.PORT || 9999
//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//route
app.use('/', router)

//connection
try {
	await connection.getConnection()
	console.log('Mysql DB connected')
} catch (error) {
	console.log(error)
}
//listen
app.listen(PORT, () => {
	console.log(`Backend node js is running on PORT ${PORT}`)
})
