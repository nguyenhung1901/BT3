const API_URL = "/api/customers";
const form = document.getElementById("editCustomerForm");
const messageBox = document.getElementById("messageBox");

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

function showMessage(message, type = "success") {
  messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}

async function loadCustomerDetail() {
  if (!customerId) {
    showMessage("Không tìm thấy id khách hàng", "danger");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${customerId}`);
    const customer = await response.json();

    if (!response.ok) {
      throw new Error(customer.message || "Không lấy được thông tin khách hàng");
    }

    form.customerCode.value = customer.customerCode || "";
    form.fullName.value = customer.fullName || "";
    form.phone.value = customer.phone || "";
    form.email.value = customer.email || "";
    form.gender.value = customer.gender || "Khác";
    form.birthDate.value = formatDateForInput(customer.birthDate);
    form.address.value = customer.address || "";
    form.customerType.value = customer.customerType || "Thường";
    form.skinType.value = customer.skinType || "Bình thường";
    form.allergyNote.value = customer.allergyNote || "";
    form.favoriteProduct.value = customer.favoriteProduct || "";
    form.lastPurchaseDate.value = formatDateForInput(customer.lastPurchaseDate);
    form.note.value = customer.note || "";
  } catch (error) {
    showMessage(error.message, "danger");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const customerData = {
    customerCode: formData.get("customerCode").trim(),
    fullName: formData.get("fullName").trim(),
    phone: formData.get("phone").trim(),
    email: formData.get("email").trim(),
    gender: formData.get("gender"),
    birthDate: formData.get("birthDate") || null,
    address: formData.get("address").trim(),
    customerType: formData.get("customerType"),
    skinType: formData.get("skinType"),
    allergyNote: formData.get("allergyNote").trim(),
    favoriteProduct: formData.get("favoriteProduct").trim(),
    lastPurchaseDate: formData.get("lastPurchaseDate") || null,
    note: formData.get("note").trim()
  };

  try {
    const response = await fetch(`${API_URL}/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cập nhật khách hàng thất bại");
    }

    showMessage("Cập nhật khách hàng thành công");

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } catch (error) {
    showMessage(error.message, "danger");
  }
});

window.addEventListener("DOMContentLoaded", loadCustomerDetail);