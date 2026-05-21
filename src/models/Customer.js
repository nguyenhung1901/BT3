import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      default: "Khác"
    },
    birthDate: {
      type: Date
    },
    address: {
      type: String,
      trim: true
    },
    customerType: {
      type: String,
      enum: ["Thường", "Thân thiết", "VIP"],
      default: "Thường"
    },
    skinType: {
      type: String,
      enum: ["Da dầu", "Da khô", "Da hỗn hợp", "Da nhạy cảm", "Bình thường"],
      default: "Bình thường"
    },
    allergyNote: {
      type: String,
      default: ""
    },
    favoriteProduct: {
      type: String,
      default: ""
    },
    lastPurchaseDate: {
      type: Date
    },
    note: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;