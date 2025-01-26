require("dotenv").config()
const express = require('express');
const connectToDB = require('./database/bd');
const isLoggedIn = require("./middleware/isLoggedIn");
const taskRouter = require("./routes/taskRoute");
const userRouter = require("./routes/userRoute");
const cardRouter = require("./routes/cardRoutes")
const app=express();

const allowedOrigins = [
    "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content for preflight requests
  }

  next();
});
  

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/task",isLoggedIn,taskRouter)
app.use("/api/card",isLoggedIn,cardRouter)
connectToDB().then(
    result=>{
        app.listen(process.env.PORT,()=>{
            console.log("Server started to listen Port",process.env.PORT)
        })
    }
)
