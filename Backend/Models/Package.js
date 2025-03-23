import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
  }
);
const Package = mongoose.model("Package", packageSchema);
export default Package;