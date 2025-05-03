import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("Server connected to Database");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
