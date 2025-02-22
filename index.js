const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// router connected
const userRouter = require('./routes/userRoutes');


const app = express();
const cors = require('cors')
dotenv.config();


app.use(express.json())
app.use(cors())

// Connectd to MongoDB
connectDB()


// Routes
app.use('/api/users', userRouter);





app.get('/', async (req, res) => {
    res.send(`Server is running`)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})