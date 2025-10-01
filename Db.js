import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export const connnectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.xg7o66k.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
    );
    console.log('DB is connected');
  } catch (err) {
    console.log(err);
  }
};
