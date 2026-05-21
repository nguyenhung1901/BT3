const API_URL = "/api/customers";
const form = document.getElementById("addCustomerForm");
const messageBox = document.getElementById("messageBox");

function showMessage(message, type = "success") {
  messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Thêm khách hàng thất bại");
    }

    showMessage("Thêm khách hàng thành công");

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } catch (error) {
    showMessage(error.message, "danger");
  }
});