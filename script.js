const reviews = document.getElementById("reviews");
const prevBtn = document.querySelector(".rev-prev");
const nextBtn = document.querySelector(".rev-next");

nextBtn.addEventListener("click", () => {
  reviews.scrollBy({ left: 340, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  reviews.scrollBy({ left: -340, behavior: "smooth" });
});



const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
})


let cart = [];


const cartPanel   = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const cartBtn     = document.querySelector(".cart-btn");
const cartClose   = document.getElementById("cartClose");



document.querySelectorAll(".dish-card").forEach(function (card) {
  const addBtn = card.querySelector(".add-btn");

  addBtn.addEventListener("click", function () {
    
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector(".price").textContent; 
    const price = parseFloat(priceText.replace(/[^0-9.]/g, "")); 

    addToCart(name, price);
  });
});



function addToCart(name, price) {
  
  const existing = cart.find(function (item) {
    return item.name === name;
  });

  if (existing) {
    existing.qty++;              
  } else {
    cart.push({ name, price, qty: 1 });  
  }

  renderCart();  
}



function removeFromCart(name) {
  cart = cart.filter(function (item) {
    return item.name !== name;   
  });
  renderCart();
}



function renderCart() {
  
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Coșul e gol</p>';
  }

  let total = 0;
  let count = 0;

  cart.forEach(function (item) {
    total += item.price * item.qty;  
    count += item.qty;                

    const line = document.createElement("div");
    line.className = "cart-item";
    line.innerHTML =
      '<div class="cart-item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<p>' + item.qty + ' x ' + item.price + ' lei</p>' +
      '</div>' +
      '<button class="cart-item-remove">&times;</button>';

    
    line.querySelector(".cart-item-remove").addEventListener("click", function () {
      removeFromCart(item.name);
    });

    cartItemsEl.appendChild(line);
  });

  
  cartTotalEl.textContent = total;
  cartCountEl.textContent = count;
}



function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);





