import express from "express"
import * as learnSignatureController from "../controllers/learnSignature.controller.js"
import upload from "../config/cloudinary.js"
import multer from "multer"
const learnSignatureRouter= express.Router()
learnSignatureRouter.get('/get-video-by-prompt', learnSignatureController.getVideoByPrompt);
learnSignatureRouter.post('/upload-video', (req, res, next) => {
    upload.single("video")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).send('Multer error occurred when uploading.');
      } else if (err) {
        console.error('Unknown error:', err);
        return res.status(500).send('Unknown error occurred when uploading.');
      }
      next();
    });
  }, learnSignatureController.uploadVideo);
export default learnSignatureRouter