import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js'
import mongoose from 'mongoose'

dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json());

// For using cookies
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: null
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        // MongoDb connection
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await app.listen(PORT, () => {
            console.log('Server started at port ' + PORT);
        })
    } catch (e) {
        console.log(e)
    }
}

start();