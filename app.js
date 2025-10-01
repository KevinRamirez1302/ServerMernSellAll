import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT ?? 3000;
import authRoutes from './Routes/auth.route.js';
import productRoutes from './Routes/product.route.js';
import shopCarRoutes from './Routes/shopCar.route.js';
import { connnectDB } from './Db.js';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? 'https://ecommerce-mern-tan.vercel.app'
    : 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(shopCarRoutes);
app.use(productRoutes);

connnectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
