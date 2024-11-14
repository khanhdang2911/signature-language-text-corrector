import connection from '../config/database.js'
import dotenv from 'dotenv'

dotenv.config()

const uploadVideo =async (req, res) => {
    try {
        if(!req.file || !req.body.prompt)
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters!',
        })
        await connection.query('insert into learn_signature(prompt, video) values (?,?)', [req.body.prompt, req.file.path])
        return res.status(200).json({
            success: true,
            message: 'Upload file successfully!',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getVideoByPrompt = async (req, res) => {
    try {
        const prompt = req.query.prompt
        if(!prompt){
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters!',
            })
        }
        const [rows, fields] = await connection.query('select * from learn_signature where prompt=?', [prompt])
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Prompt not found!',
            })
        }
        return res.status(200).json({
            success: true,
            videos: rows,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
export {
    uploadVideo,
    getVideoByPrompt
}