import { sendMessage } from "../controllers/message.controller.js";
import express from "express"
import protectedRoute from "../middleware/protectedRoute.js";

const route = express.Router();

route.post('/send/:id',protectedRoute,sendMessage)

export {route as messageRoute}