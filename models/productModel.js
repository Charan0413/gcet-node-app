import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  imgUrl: { type: String },
  price: { type: Number },
});

export default mongoose.model("Product", productSchema);