// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["cliente", "admin"],
    default: "cliente",
  },
}, { timestamps: true });

// 👇 Esta línea es CLAVE: exporta el modelo como "default"
const User = mongoose.model("User", userSchema);
export default User;