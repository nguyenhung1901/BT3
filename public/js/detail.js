const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

const customerInfo = document.getElementById("customerInfo");
const orderTableBody = document.getElementById("orderTableBody");
const totalSpent = document.getElementById("totalSpent");
const messageBox = document.getElementById("messageBox");
const orderForm = document.getElementById("orderForm");

const statTotalOrders = document.getElementById("statTotalOrders");
const statPaidOrders = document.getElementById("statPaidOrders");
const statTotalAmount = document.getElementById("statTotalAmount");
const statDebtAmount = document.getElementById("statDebtAmount");

function showMessage(message, type = "success") {
  messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => {
    messageBox.innerHTML = "";
  }, 3000);
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " VNĐ";
}

async function loadCustomerDetail() {
  try {
    const response = await fetch(`/api/customers/${customerId}`);
    const customer = await response.json();

    if (!response.ok) {
      throw new Error(customer.message || "Không lấy được thông tin khách hàng");
    }

    customerInfo.innerHTML = `
      <div><strong>Mã KH:</strong> ${customer.customerCode || ""}</div>
      <div><strong>Họ tên:</strong> ${customer.fullName || ""}</div>
      <div><strong>Số điện thoại:</strong> ${customer.phone || ""}</div>
      <div><strong>Email:</strong> ${customer.email || ""}</div>
      <div><strong>Giới tính:</strong> ${customer.gender || ""}</div>
      <div><strong>Ngày sinh:</strong> ${formatDate(customer.birthDate)}</div>
      <div><strong>Địa chỉ:</strong> ${customer.address || ""}</div>
      <div><strong>Loại khách hàng:</strong> ${customer.customerType || ""}</div>
      <div><strong>Loại da:</strong> ${customer.skinType || ""}</div>
      <div><strong>Sản phẩm quan tâm:</strong> ${customer.favoriteProduct || ""}</div>
      <div><strong>Ghi chú dị ứng:</strong> ${customer.allergyNote || ""}</div>
      <div><strong>Ghi chú:</strong> ${customer.note || ""}</div>
    `;
  } catch (error) {
    customerInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

async function loadOrders() {
  try {
    const response = await fetch(`/api/orders/customer/${customerId}`);
    const orders = await response.json();

    if (!response.ok) {
      throw new Error(orders.message || "Không lấy được đơn hàng");
    }

    if (!orders.length) {
      orderTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center">Khách hàng chưa có đơn hàng</td>
        </tr>
      `;

      statTotalOrders.textContent = "0";
      statPaidOrders.textContent = "0";
      statTotalAmount.textContent = "0 VNĐ";
      statDebtAmount.textContent = "0 VNĐ";
      return;
    }

    let total = 0;
    let debt = 0;
    let paidCount = 0;

    orderTableBody.innerHTML = orders
      .map((order) => {
        const amount = Number(order.totalAmount || 0);
        total += amount;

        if (order.status === "Đã thanh toán") {
          paidCount += 1;
        }

        if (order.status === "Chưa thanh toán") {
          debt += amount;
        }
        

        return `
          <tr>
            <td>${order.orderCode || ""}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${order.productName || ""}</td>
            <td>${order.quantity || 0}</td>
            <td>${formatCurrency(order.unitPrice)}</td>
            <td>${formatCurrency(order.totalAmount)}</td>
            <td>
              <span class="status-badge ${
                order.status === "Đã thanh toán" ? "status-paid" : "status-unpaid"
              }">
                ${order.status || ""}
              </span>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="handleDeleteOrder('${order._id}')">
                Xóa
              </button>
            </td>
          </tr>
        `;
      })
      .join("");

    statTotalOrders.textContent = orders.length;
    statPaidOrders.textContent = paidCount;
    statTotalAmount.textContent = formatCurrency(total-debt);
    statDebtAmount.textContent = formatCurrency(debt);
  } catch (error) {
    orderTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">${error.message}</td>
      </tr>
    `;
  }
}

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);

  const orderData = {
    orderCode: formData.get("orderCode").trim(),
    customer: customerId,
    orderDate: formData.get("orderDate"),
    productName: formData.get("productName").trim(),
    quantity: Number(formData.get("quantity")),
    unitPrice: Number(formData.get("unitPrice")),
    status: formData.get("status")
  };

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Thêm đơn hàng thất bại");
    }

    showMessage("Thêm đơn hàng thành công");
    orderForm.reset();
    loadOrders();
  } catch (error) {
    showMessage(error.message, "danger");
  }
});

async function handleDeleteOrder(orderId) {
  const confirmed = confirm("Bạn có chắc muốn xóa đơn hàng này?");
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Xóa đơn hàng thất bại");
    }

    showMessage("Xóa đơn hàng thành công");
    loadOrders();
  } catch (error) {
    showMessage(error.message, "danger");
  }
}

window.handleDeleteOrder = handleDeleteOrder;

window.addEventListener("DOMContentLoaded", async () => {
  await loadCustomerDetail();
  await loadOrders();
});