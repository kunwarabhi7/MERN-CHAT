
import express from 'express';
import { getUserForSideBar } from '../controllers/user.controller.js';
import protectedRoute from '../middleware/protectedRoute.js';

const router = express.Router();

router.get("/",protectedRoute,  getUserForSideBar)


export { router as userRoutes} ;