const API_URL = "/api/customers";

const keywordInput = document.getElementById("keyword");
const customerTypeSelect = document.getElementById("customerType");
const sortSelect = document.getElementById("sort");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const customerTableBody = document.getElementById("customerTableBody");
const totalCustomers = document.getElementById("totalCustomers");
const messageBox = document.getElementById("messageBox");

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

async function fetchCustomers() {
  try {
    const keyword = keywordInput.value.trim();
    const customerType = customerTypeSelect.value;
    const sort = sortSelect.value;

    const query = new URLSearchParams();

    if (keyword) query.append("keyword", keyword);
    if (customerType) query.append("customerType", customerType);
    if (sort) query.append("sort", sort);

    const response = await fetch(`${API_URL}?${query.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải danh sách khách hàng");
    }

    renderCustomers(data);
  } catch (error) {
    customerTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center">Có lỗi xảy ra: ${error.message}</td>
      </tr>
    `;
  }
}

function renderCustomers(customers) {
  totalCustomers.textContent = `Tổng: ${customers.length}`;

  if (!customers.length) {
    customerTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center">Không có dữ liệu khách hàng</td>
      </tr>
    `;
    return;
  }

  customerTableBody.innerHTML = customers
    .map(
      (customer, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${customer.customerCode || ""}</td>
          <td>${customer.fullName || ""}</td>
          <td>${customer.phone || ""}</td>
          <td>${customer.email || ""}</td>
          <td>${customer.customerType || ""}</td>
          <td>${customer.skinType || ""}</td>
          <td>${formatDate(customer.createdAt)}</td>
          <td>
            <div class="action-buttons">
              <a class="btn btn-primary btn-sm" href="/detail.html?id=${customer._id}">Chi tiết</a>
              <a class="btn btn-warning btn-sm" href="/edit.html?id=${customer._id}">Sửa</a>
              <button class="btn btn-danger btn-sm" onclick="handleDelete('${customer._id}')">Xóa</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

async function handleDelete(id) {
  const confirmed = confirm("Bạn có chắc muốn xóa khách hàng này?");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Xóa khách hàng thất bại");
    }

    showMessage(data.message || "Xóa khách hàng thành công");
    fetchCustomers();
  } catch (error) {
    showMessage(error.message, "danger");
  }
}

btnSearch.addEventListener("click", fetchCustomers);

btnReset.addEventListener("click", () => {
  keywordInput.value = "";
  customerTypeSelect.value = "";
  sortSelect.value = "newest";
  fetchCustomers();
});

window.handleDelete = handleDelete;
window.addEventListener("DOMContentLoaded", fetchCustomers);