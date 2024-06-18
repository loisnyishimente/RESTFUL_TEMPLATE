import express, {json} from "express"
import { config} from "dotenv";
config({
    path: "./.env"
});
import cors from "cors";
import {corsFunction} from "./utils/cors.js";
import {createRequire} from "module";
import swaggerUi from 'swagger-ui-express';
import sequelize, { connectDB} from './utils/database.js';
import userRoutes from "./routes/user.routes.js"
import booksRoutes from "./routes/books.route.js"
import bodyParser from 'body-parser';
// import swaggerJson from "./swagger.json";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Upload endpoint

app.use(cors());
app.use(corsFunction);
app.use(json())

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/users",userRoutes)
app.use("/books",booksRoutes)


  

app.listen(process.env.PORT, async () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
    await connectDB();

})