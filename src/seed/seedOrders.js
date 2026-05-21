import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();

    const customer1 = await Customer.findOne({ customerCode: "KH001" });
    const customer2 = await Customer.findOne({ customerCode: "KH002" });
    const customer3 = await Customer.findOne({ customerCode: "KH003" });

    await Order.create([
      {
        orderCode: "DH001",
        customer: customer1._id,
        orderDate: "2026-04-10",
        productName: "Serum dưỡng ẩm",
        quantity: 2,
        unitPrice: 250000,
        totalAmount: 500000,
        status: "Đã thanh toán"
      },
      {
        orderCode: "DH002",
        customer: customer1._id,
        orderDate: "2026-04-18",
        productName: "Kem chống nắng",
        quantity: 1,
        unitPrice: 320000,
        totalAmount: 320000,
        status: "Đã thanh toán"
      },
      {
        orderCode: "DH003",
        customer: customer2._id,
        orderDate: "2026-04-05",
        productName: "Sữa rửa mặt kiềm dầu",
        quantity: 1,
        unitPrice: 180000,
        totalAmount: 180000,
        status: "Đã thanh toán"
      },
      {
        orderCode: "DH004",
        customer: customer2._id,
        orderDate: "2026-04-12",
        productName: "Gel trị mụn",
        quantity: 2,
        unitPrice: 150000,
        totalAmount: 300000,
        status: "Đã thanh toán"
      },
      {
        orderCode: "DH005",
        customer: customer3._id,
        orderDate: "2026-04-20",
        productName: "Son dưỡng có màu",
        quantity: 1,
        unitPrice: 220000,
        totalAmount: 220000,
        status: "Đã thanh toán"
      },
      {
        orderCode: "DH006",
        customer: customer3._id,
        orderDate: "2026-04-20",
        productName: "Son dưỡng",
        quantity: 1,
        unitPrice: 220000,
        totalAmount: 220000,
        status: "Chưa thanh toán"
      }
    ]);

    console.log("Seed orders thành công");
    process.exit();
  } catch (error) {
    console.error("Seed lỗi:", error.message);
    process.exit(1);
  }
};

seedData();