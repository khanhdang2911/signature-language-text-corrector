/** @format */
import { GoogleGenerativeAI } from '@google/generative-ai'

const getTextCorrector = async (req, res, next) => {
	try {
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

		const prompt = `
			I will give the input as a sentence, from which you will combine it into a complete sentence, for example, if I give the sentence: My name is K H A N H, you will combine it into My name is Khanh,...
			This is my sentence:${req.body.text_voice}
		`

		const result = await model.generateContent(prompt)
		req.body.text_voice = result.response.text()
		next()
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		})
	}
}

export default getTextCorrector
