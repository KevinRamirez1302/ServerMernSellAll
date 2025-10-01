import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export const connnectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://KevinAlexander13:${process.env.DBPASSWORD}@cluster0.xg7o66k.mongodb.net/SellAll?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('DB is connected');
  } catch (err) {
    console.log(err);
  }
};
