import "../config/env.js"
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import connectDB from '../utils/db.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin.routes.js';
// import cPanelRoutes from './routes/cpanel.routes.js';
import siteRoutes from '../routes/site.routes.js';


const app = express();


app.use(
  cors({
    origin: [
      "https://hostmost.vercel.app", // production frontend
      "http://localhost:5173", // local frontend
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/cpanel', cPanelRoutes);
app.use('/api/site', siteRoutes);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 7000

app.get('/',(req,res)=>{
  res.send("hello host most")
});


connectDB()
app.listen(port,()=>{
console.log(`server is running on http://localhost:${port}`)
});

export default app;
