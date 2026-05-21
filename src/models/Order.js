import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    orderDate: {
      type: Date,
      required: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán"],
      default: "Chưa thanh toán"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;