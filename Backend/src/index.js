import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dbConnect from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import './config/passportConfig.js';

//database connection

dotenv.config();
dbConnect();

const app = express();

//middlewares
const corsOptions = {
    origin: ['http://localhost:3001'],
    credentials: true,
};

app.use(cors(corsOptions));     
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,   
    cookie : {
        maxAge: 6000 * 60,
    }
}));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use("/api/auth", authRoutes);


//listen app
const PORT = process.env.PORT || 7002;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});