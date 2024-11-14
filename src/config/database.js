/** @format */

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'signature_lang',
	password: process.env.DB_PASSWORD,
})

export default connection