import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import {getEmployeeLaptops, registerEmployeeLaptop} from "../controllers/employeeLaptop.controller.js"
import { validateEmployeeLaptopRegistration } from '../validators/employeeLaptop.validator.js'

const router = express.Router()

router.get("/", authenticate, getEmployeeLaptops)

router.post("/register",[validateEmployeeLaptopRegistration,authenticate] ,registerEmployeeLaptop)

export default router;