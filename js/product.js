// js/product.js
import { getData } from "./request/app.js";
import { addToCart } from "./request/cart.js";

function addUIData(data) {
  const grid = document.querySelector(".grid");
  data.forEach((element) => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-xl shadow-md hover:shadow-lg transition p-4";

    div.innerHTML = `
      <img src="${element.image || 'https://via.placeholder.com/200'}" alt="${element.name}" class="w-full h-48 object-contain mb-3">
      <h2 class="text-lg font-semibold text-gray-800">${element.name}</h2>
      <p class="text-gray-600 mt-1">Narx: <span class="text-blue-700 font-bold">${element.price} so‘m</span></p>
      <p class="text-orange-500 text-sm mt-1 border border-orange-400 px-2 py-1 rounded">${element.monthly} × 6 oy</p>
      <button class="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 buy-btn">Xarid qilish</button>
    `;

    // Tugma bosilganda savatga qo‘shish
    div.querySelector(".buy-btn").addEventListener("click", () => {
      addToCart(element);
    });

    grid.appendChild(div);
  });
}

// API’ni chaqirish
getData("https://6904846c6b8dabde49640f3d.mockapi.io/name/products")
  .then((data) => addUIData(data))
  .catch((err) => console.error("Xato:", err));
