/** @format */

import connection from '../config/database.js'
const getAllHistory = async (req, res) => {
	try {
		const [rows, fields] = await connection.query('select * from histories')
		return res.status(200).json({
			success: true,
			histories: rows,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}
const createTextVoice = async (req, res) => {
	try {
		const data = req.body
		if (!data.text_voice) {
			return res.status(500).json({
				success: false,
				message: 'Missing required parameters!',
			})
		}
		const currentDate = new Date()
		const year = currentDate.getFullYear()
		const month = currentDate.getMonth() + 1
		const date = currentDate.getDate()
		const hour = currentDate.getHours()
		const minute = currentDate.getMinutes()
		const second = currentDate.getSeconds()
		const formatDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`
		await connection.query('insert into histories(text_voice, date_insert) values (?,?)', [data.text_voice, formatDate])
		return res.status(200).json({
			success: true,
			message: 'Ok',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}
export { getAllHistory, createTextVoice }
