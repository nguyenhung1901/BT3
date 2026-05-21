import Order from "../models/Order.js";

export const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.customerId }).sort({
      orderDate: -1
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy danh sách đơn hàng",
      error: error.message
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      orderCode,
      customer,
      orderDate,
      productName,
      quantity,
      unitPrice,
      status
    } = req.body;

    const existingOrder = await Order.findOne({ orderCode });

    if (existingOrder) {
      return res.status(400).json({
        message: "Mã đơn hàng đã tồn tại"
      });
    }

    const totalAmount = Number(quantity) * Number(unitPrice);

    const order = await Order.create({
      orderCode,
      customer,
      orderDate,
      productName,
      quantity,
      unitPrice,
      totalAmount,
      status
    });

    res.status(201).json({
      message: "Thêm đơn hàng thành công",
      order
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi thêm đơn hàng",
      error: error.message
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    res.status(200).json({
      message: "Xóa đơn hàng thành công"
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa đơn hàng",
      error: error.message
    });
  }
};