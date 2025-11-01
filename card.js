// request/cart.js

// Savatchadagi mahsulotlarni localStorage orqali saqlaymiz
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Mahsulot avval qo‘shilgan bo‘lsa, miqdorini oshiramiz
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Saqlash
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} savatchaga qo‘shildi!`);
}

export { addToCart };
