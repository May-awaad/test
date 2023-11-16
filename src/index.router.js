
import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import cors from 'cors'
import { globalErrorHandling } from './utils/errorHandling.js'
const bootstrap = (app, express) => {
    app.use(cors())
    app.use(express.json())
    app.use("/auth", authRouter)
    app.use("/user", userRouter)

    app.use("*", (req, res, next) => {
        return res.json({ message: "In-valid Routing" })
    });
    app.use(globalErrorHandling)
    connectDB()
}
export default bootstrap