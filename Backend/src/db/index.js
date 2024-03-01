import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);//URL
    console.log(`MongoDb connection !! DB HOST ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDb Connection Fail: " + error);
    process.exit(1);  //process is the reference of current running application. process is coming form console.we can use throw keyword like 1st approch to exit the process.
  }
}

export default connectDB;