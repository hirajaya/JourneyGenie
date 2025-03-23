import mongoose from "mongoose";

const touristSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
  }
);
const Tourist = mongoose.model("Tourist", touristSchema);
export default Tourist;