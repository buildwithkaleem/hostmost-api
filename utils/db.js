import mongoose from "mongoose";

const connectDB = async ()=>{
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`connect to db `)
  } catch (error) {
    console.log(`can not connect to db`)
  }
}

export default connectDB;