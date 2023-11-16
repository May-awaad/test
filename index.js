import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from "express";
import bootstrap from "./src/index.router.js";
const app = express();
app.use(cors())
const port = process.env.PORT || 3000;


bootstrap(app, express);
app.listen(port, () => console.log(`App listening on port ${port}`));