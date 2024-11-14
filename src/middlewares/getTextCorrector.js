/** @format */
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const getTextCorrector = async (req, res, next) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
			I will put in a sentence, from there you will combine it into a complete sentence, for example, if I give the sentence: My name is K H A N H then you will combine it into My name is Khanh,... But just reuse it. words in the submitted paragraph, only add some words that are supported from there, absolutely do not add outside.
			This is my sentence:${req.body.text_voice}
		`;
    const result = await model.generateContent(prompt);
    req.body.text_voice = result.response.text();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export default getTextCorrector;
