import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const { keyword = "", customerType = "", sort = "" } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { fullName: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } }
      ];
    }

    if (customerType) {
      query.customerType = customerType;
    }

    let sortOption = { createdAt: -1 };

    if (sort === "name_asc") sortOption = { fullName: 1 };
    if (sort === "name_desc") sortOption = { fullName: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const customers = await Customer.find(query).sort(sortOption);

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy danh sách khách hàng",
      error: error.message
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy chi tiết khách hàng",
      error: error.message
    });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const existingCustomerCode = await Customer.findOne({
      customerCode: req.body.customerCode
    });

    if (existingCustomerCode) {
      return res.status(400).json({
        message: "Mã khách hàng đã tồn tại"
      });
    }

    const existingPhone = await Customer.findOne({
      phone: req.body.phone
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại"
      });
    }

    const existingEmail = await Customer.findOne({
      email: req.body.email
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }

    const customer = await Customer.create(req.body);

    res.status(201).json({
      message: "Thêm khách hàng thành công",
      customer
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi thêm khách hàng",
      error: error.message
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const existingCustomerCode = await Customer.findOne({
      customerCode: req.body.customerCode,
      _id: { $ne: customerId }
    });

    if (existingCustomerCode) {
      return res.status(400).json({
        message: "Mã khách hàng đã tồn tại"
      });
    }

    const existingPhone = await Customer.findOne({
      phone: req.body.phone,
      _id: { $ne: customerId }
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại"
      });
    }

    const existingEmail = await Customer.findOne({
      email: req.body.email,
      _id: { $ne: customerId }
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }

    const customer = await Customer.findByIdAndUpdate(customerId, req.body, {
      new: true,
      runValidators: true
    });

    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json({
      message: "Cập nhật khách hàng thành công",
      customer
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi cập nhật khách hàng",
      error: error.message
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res.status(200).json({
      message: "Xóa khách hàng thành công"
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa khách hàng",
      error: error.message
    });
  }
};