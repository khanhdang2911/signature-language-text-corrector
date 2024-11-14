/** @format */

import express from "express";
import * as homeController from "../controllers/home.controller.js";
import getTextCorrector from "../middlewares/getTextCorrector.js";
const homeRouter = express.Router();

homeRouter.get("/get-all-history", homeController.getAllHistory);
homeRouter.get("/get-history-by-id/:id", homeController.getHisoryById);
homeRouter.post(
  "/create-text-voice",
  getTextCorrector,
  homeController.createTextVoice
);
homeRouter.delete("/delete-text-voice/:id", homeController.deleteTextVoice);
homeRouter.put("/update-text-voice", homeController.updateTextVoice);
export default homeRouter;
