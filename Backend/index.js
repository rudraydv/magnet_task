const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require('./routers/authRoutes');
const taskRoutes = require('./routers/TaskRoutes');



dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);



const PORT = process.env.PORT || 4001;

const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("error:",error);
    
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})