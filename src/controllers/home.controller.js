/** @format */

import connection from '../config/database.js'
import dotenv from 'dotenv'

dotenv.config()
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
			message: data.text_voice,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}

const deleteTextVoice = async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(404).json({
				success: false,
				message: 'Missing required parameters!',
			})
		}
		await connection.query('delete from histories where id=?', [id])
		return res.status(200).json({
			success: true,
			message: 'Text voice is deleted',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}

const updateTextVoice = async (req, res) => {
	try {
		const data = req.body
		if (!data.id || !data.text_voice) {
			return res.status(404).json({
				success: false,
				message: 'Data is invalid from body!',
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

		await connection.query('update histories set text_voice=?, date_insert=? where id=? ', [data.text_voice, formatDate, data.id])
		return res.status(200).json({
			success: true,
			message: 'Update text voice in histories successfully!',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}

export { getAllHistory, createTextVoice, deleteTextVoice, updateTextVoice }
