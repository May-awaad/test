import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bootstrap from "./src/index.router.js";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res, next) => {
    return res.json({ message: "In-valid Routing" })
});

// bootstrap(app, express);
app.listen(port, () => console.log(`App listening on port ${port}`));