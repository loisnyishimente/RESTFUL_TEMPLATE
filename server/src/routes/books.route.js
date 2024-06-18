import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import {getBooks, registerBooks} from "../controllers/books.controller.js"
import { validateBook } from '../validators/books.validator.js'
import { searchBooksByName } from "../controllers/books.controller.js";
const router = express.Router()

router.get("/", authenticate, getBooks)

router.post("/register",[validateBook,authenticate] ,registerBooks)
router.get('/search', authenticate, searchBooksByName);


export default router;