import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Customer from "../models/Customer.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Customer.deleteMany();

    await Customer.create([
      {
        customerCode: "KH001",
        fullName: "Nguyễn Thị Lan",
        phone: "0912345678",
        email: "lan.nguyen@gmail.com",
        gender: "Nữ",
        birthDate: "2001-05-12",
        address: "Hải Châu, Đà Nẵng",
        customerType: "VIP",
        skinType: "Da nhạy cảm",
        allergyNote: "Dị ứng mỹ phẩm có hương liệu mạnh",
        favoriteProduct: "Serum dưỡng ẩm",
        lastPurchaseDate: "2026-04-10",
        note: "Thường mua vào cuối tháng"
      },
      {
        customerCode: "KH002",
        fullName: "Trần Minh Anh",
        phone: "0987654321",
        email: "minhanh.tran@gmail.com",
        gender: "Nữ",
        birthDate: "2000-08-21",
        address: "Thanh Khê, Đà Nẵng",
        customerType: "Thân thiết",
        skinType: "Da dầu",
        allergyNote: "",
        favoriteProduct: "Sữa rửa mặt kiềm dầu",
        lastPurchaseDate: "2026-03-28",
        note: "Quan tâm sản phẩm trị mụn"
      },
      {
        customerCode: "KH003",
        fullName: "Lê Hoàng Nam",
        phone: "0905123456",
        email: "hoangnam.le@gmail.com",
        gender: "Nam",
        birthDate: "1999-11-03",
        address: "Liên Chiểu, Đà Nẵng",
        customerType: "Thường",
        skinType: "Da hỗn hợp",
        allergyNote: "",
        favoriteProduct: "Kem chống nắng",
        lastPurchaseDate: "2026-04-01",
        note: "Khách mới"
      },
      {
        customerCode: "KH004",
        fullName: "Phạm Thị Hương",
        phone: "0935111222",
        email: "huong.pham@gmail.com",
        gender: "Nữ",
        birthDate: "1998-02-14",
        address: "Sơn Trà, Đà Nẵng",
        customerType: "VIP",
        skinType: "Da khô",
        allergyNote: "Không dùng được mỹ phẩm chứa cồn",
        favoriteProduct: "Kem dưỡng phục hồi",
        lastPurchaseDate: "2026-04-15",
        note: "Khách mua thường xuyên"
      },
      {
        customerCode: "KH005",
        fullName: "Ngô Gia Bảo",
        phone: "0977333444",
        email: "giabao.ngo@gmail.com",
        gender: "Nam",
        birthDate: "2002-07-09",
        address: "Ngũ Hành Sơn, Đà Nẵng",
        customerType: "Thường",
        skinType: "Da dầu",
        allergyNote: "",
        favoriteProduct: "Gel trị mụn",
        lastPurchaseDate: "2026-03-18",
        note: "Ưu tiên sản phẩm giá sinh viên"
      },
      {
        customerCode: "KH006",
        fullName: "Đỗ Thị Mỹ Linh",
        phone: "0944222333",
        email: "mylinh.do@gmail.com",
        gender: "Nữ",
        birthDate: "2003-10-30",
        address: "Cẩm Lệ, Đà Nẵng",
        customerType: "Thân thiết",
        skinType: "Da nhạy cảm",
        allergyNote: "Da dễ kích ứng với sản phẩm tẩy mạnh",
        favoriteProduct: "Toner dịu nhẹ",
        lastPurchaseDate: "2026-04-07",
        note: "Hay hỏi kỹ thành phần"
      },
      {
        customerCode: "KH007",
        fullName: "Bùi Quốc Khánh",
        phone: "0911666777",
        email: "quockhanh.bui@gmail.com",
        gender: "Nam",
        birthDate: "1997-12-25",
        address: "Hòa Vang, Đà Nẵng",
        customerType: "Thường",
        skinType: "Bình thường",
        allergyNote: "",
        favoriteProduct: "Sữa rửa mặt",
        lastPurchaseDate: "2026-02-27",
        note: "Mua theo tư vấn của nhân viên"
      },
      {
        customerCode: "KH008",
        fullName: "Võ Thị Ngọc Mai",
        phone: "0968888999",
        email: "ngocmai.vo@gmail.com",
        gender: "Nữ",
        birthDate: "2001-04-17",
        address: "Hải Châu, Đà Nẵng",
        customerType: "VIP",
        skinType: "Da hỗn hợp",
        allergyNote: "",
        favoriteProduct: "Son dưỡng có màu",
        lastPurchaseDate: "2026-04-18",
        note: "Mua nhiều sản phẩm makeup"
      },
      {
        customerCode: "KH009",
        fullName: "Huỳnh Thanh Tâm",
        phone: "0939999000",
        email: "thanhtam.huynh@gmail.com",
        gender: "Nữ",
        birthDate: "1996-09-05",
        address: "Thanh Khê, Đà Nẵng",
        customerType: "Thân thiết",
        skinType: "Da khô",
        allergyNote: "",
        favoriteProduct: "Mặt nạ dưỡng ẩm",
        lastPurchaseDate: "2026-03-30",
        note: "Thường mua combo chăm sóc da"
      },
      {
        customerCode: "KH010",
        fullName: "Phan Tuấn Kiệt",
        phone: "0908777666",
        email: "tuankiet.phan@gmail.com",
        gender: "Nam",
        birthDate: "2000-01-19",
        address: "Liên Chiểu, Đà Nẵng",
        customerType: "Thường",
        skinType: "Da dầu",
        allergyNote: "",
        favoriteProduct: "Kem chống nắng không bóng dầu",
        lastPurchaseDate: "2026-04-05",
        note: "Ưu tiên sản phẩm cho nam"
      }
    ]);

    console.log("Seed customers thành công");
    process.exit();
  } catch (error) {
    console.error("Seed lỗi:", error.message);
    process.exit(1);
  }
};

seedData();