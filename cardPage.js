// js/cartPage.js
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.querySelector(".cart-container");

if (cart.length === 0) {
  container.innerHTML = "<p class='text-center text-gray-600 text-lg'>Savatcha bo‘sh 😢</p>";
} else {
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "border p-4 rounded-lg bg-white mb-4 shadow";

    div.innerHTML = `
      <h2 class="font-bold text-lg text-gray-800">${item.name}</h2>
      <p class="text-gray-700">${item.price} so‘m × ${item.quantity} dona</p>
    `;

    total += item.price * item.quantity;
    container.appendChild(div);
  });

  // Umumiy narx
  const totalDiv = document.createElement("div");
  totalDiv.className = "text-right font-semibold text-xl text-blue-700 mt-4";
  totalDiv.innerHTML = `Umumiy summa: ${total.toLocaleString()} so‘m`;
  container.appendChild(totalDiv);
}
