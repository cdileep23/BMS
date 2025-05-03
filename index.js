import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import batterRouter from "./route.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from BMS");
});
app.use("/api", batterRouter);


const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(process.env.PORT, () => {
      console.log(` Server started at port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};

startServer();
