import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();

const MONGODB_URI = process.env.MONGODB_URI

app.use(cors()); 
app.use(express.json());



app.use("/orders", orderRouter); 

app.use("/users", userRouter);

app.use("/products", productRouter);


app.get("/", (req, res) => {
  return res.send("Hello! Good morning :)");
});

app.get("/weather", (req, res) => {
  return res.send("Heyy!! Today's weather is 28"); 
});

app.get("/name", (req, res) => {
  return res.send("Hello Rishitha!"); 
});


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });

  