// Api
const API_URL = "https://fakestoreapi.com/products"
const INR_RATE = 85

let products = []

async function getProducts() {
  const res = await fetch(API_URL)
  const data = await res.json()   // ✅ store in data

  const customProducts = [
    {
      id: 101,
      title: "Atomic Habits Book",
      price: 15,
      rating: { rate: 4.8 },
      image: "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg",
      category: "books"
    },
    {
      id: 102,
      title: "Air Fryer",
      price: 35,
      rating: { rate: 4.5 },
      image: "https://www.philips.co.in/c-dam/b2c/kitchen/airfryer/AirfryerImages/airfryer-s-xs.png",
      category: "home"
    },
    {
      id: 103,
      title: "Iron",
      price: 12,
      rating: { rate: 4.5 },
      image: "https://static.vecteezy.com/system/resources/thumbnails/054/350/336/small/modern-electric-steam-iron-with-temperature-control-free-photo.jpg",
      category: "home"
    },
    {
      id: 104,
      title: "Coffee Maker",
      price: 40,
      rating: { rate: 3.9 },
      image: "https://media.istockphoto.com/id/1366747135/photo/a-womans-hand-pours-coffee-from-a-coffee-pot-into-a-cup-home-life-electric-coffee-maker-on.jpg?s=612x612&w=0&k=20&c=xq2eYZglFWVG23g02udJO8N5dPdTHelcJ2ZW385LrEI=",
      category: "home"
    },
    {
      id: 105,
      title: "One Indian Girl",
      price: 16,
      rating: { rate: 4.5 },
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/One_Indian_Girl.jpg/250px-One_Indian_Girl.jpg",
      category: "books"
    },
    {
      id: 106,
      title: "The Power of Subconscious Mind",
      price: 17,
      rating: { rate: 4.5 },
      image: "https://rupapublications.co.in/images/1725973829.jpg",
      category: "books"
    },
    {
      id: 107,
      title: "microwaves",
      price: 37,
      rating: { rate: 4.2 },
      image: "https://www.electrolux.in/globalassets/support/faq/microwave-faq-640x640.jpg?width=464",
      category: "home"
    },
    {
      id: 108,
      title:"The God Of Small Things",
      price: 11 ,
      rating: {rate : 4.0},
      image: "https://m.media-amazon.com/images/I/91saO95VziL._AC_UF1000,1000_QL80_.jpg",
      category:"books"
    }
  ]

  products = [...data, ...customProducts] 
  selectedCategory = "all"
  setTimeout(() => {
  resetCategoryUI()
  filterProducts()
}, 0)
  // resetCategoryUI()
  // filterProducts()
  // displayProducts(products)
}

getProducts()
// resetCategoryUI()

// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || []

// clean invalid data
cart = cart.filter(item => item && item.price)
localStorage.setItem("cart", JSON.stringify(cart))

updateCartUI()

// ================= DISPLAY PRODUCTS =================
const container = document.getElementById("productContainer")

function displayProducts(data) {
  container.innerHTML = ""

  data.forEach(product => {

    const inCart = cart.find(item => item.id === product.id)
    const card = `
<div class="bg-white rounded-2xl p-4 shadow-sm 
            transition duration-300 ease-in-out
            hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group">

  <div class="overflow-hidden rounded-xl">
    <img src="${product.image}" 
      class="w-full h-48 object-cover transition duration-300 group-hover:scale-110">
  </div>

  <h2 class="mt-3 font-semibold text-[#073a7a] group-hover:text-[#052c5c] transition">
    ${product.title}
  </h2>

  <div class="flex justify-between items-center mt-1">
    <p class="font-bold text-gray-800">
      ₹${Math.round(product.price * INR_RATE)}
    </p>
    <span class="text-sm text-yellow-500">⭐ ${product.rating.rate}</span>
  </div>

  <button 
    onclick='addToCart(${JSON.stringify(product)})'
    type="button"
    class="mt-3 w-full py-2 rounded-lg transition duration-300
    ${inCart 
      ? "bg-green-500 text-white cursor-not-allowed" 
      : "bg-[#073a7a] text-white hover:bg-[#052c5c] hover:scale-105 active:scale-95"}"
    ${inCart ? "disabled" : ""}
  >
    ${inCart ? "Added ✅" : "Add to Cart"}
  </button>

</div>
`

    container.innerHTML += card
  })
}

// ================= ADD TO CART =================
function addToCart(product) {

  const existing = cart.find(item => item.id === product.id)

  if (existing) {
    Swal.fire("Already in Cart ⚠️")
    return
  }

  cart.push({ ...product, qty: 1 })

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartUI()
  // displayProducts(products)
  filterProducts()

  Swal.fire({
    title: "Added to Cart 🛒",
    text: product.title,
    icon: "success",
    timer: 1200,
    showConfirmButton: false
  })
}

// ================= CART COUNT =================
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  document.getElementById("cartCount").innerText = totalItems
}

// ================= OPEN CART =================
function openCart() {
  if (cart.length === 0) {
    Swal.fire({
      title: " Nothing Here",
      text: " Start Shopping 😄",
      icon: "info",
      confirmButtonText: "Back to Homepage"
    }).then(() => {
      window.location.href = "/"; // go to homepage
    });
    return; // ✅ stop here, do not proceed to payment
  }

  let total = cart.reduce((sum, item) => sum + Math.round(item.price * INR_RATE) * item.qty, 0);

  Swal.fire({
    title: "Your Cart 🛒",
    html: `
      <div id="cartContent" class="text-left max-h-80 overflow-y-auto"></div>
      <div class="mt-4 text-right font-bold">
        Total: <span id="cartTotal">₹${total}</span>
      </div>
    `,
    width: 500,
    confirmButtonText: "Pay Now 💳",
    showCancelButton: true,
    cancelButtonText: "Back to Homepage"
  }).then((result) => {
    // ✅ Check again if cart is empty before payment
    if (cart.length === 0 || total === 0) {
      Swal.fire({
        title: "Cart is Empty ⛔",
        text: "Cannot proceed with payment",
        icon: "error",
        timer: 1200,
        showConfirmButton: false
      });
      return;
    }

    if (result.isConfirmed) {
      // Payment successful
      Swal.fire({
        title: "Payment Successful ✅",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      displayProducts(products);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "/"; // back to homepage
    }
  });

  setTimeout(renderCart, 100);
}


// ================= RENDER CART =================
function renderCart() {
  let total = 0

  let html = cart.map((item, index) => {

    const price = Math.round(item.price * INR_RATE)
    const itemTotal = price * item.qty
    total += itemTotal

    return `
      <div class="border-b py-3 flex justify-between items-center">

        <div class="flex items-center gap-3">
          <img src="${item.image}" class="w-10 h-10">
          <div>
            <p class="font-semibold">${item.title}</p>
            <p class="text-sm text-gray-500">
              ₹${price} × ${item.qty} = 
              <b>₹${itemTotal}</b>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button class="dec-btn" data-i="${index}" type="button">-</button>
          <span>${item.qty}</span>
          <button class="inc-btn" data-i="${index}" type="button">+</button>
          <button class="del-btn" data-i="${index}" type="button">❌</button>
        </div>

      </div>
    `
  }).join("")

  document.getElementById("cartContent").innerHTML = html
  document.getElementById("cartTotal").innerText = "₹" + total
}

let selectedCategory = "all";
// ====================FILTER FUNCTION ===========

function filterProducts() {
  let filtered = [...products];

  // 1️⃣ Category
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // 2️⃣ Price
  const price = document.getElementById("priceFilter")?.value;
  if (price === "low") filtered = filtered.filter(p => p.price * INR_RATE < 1000);
  else if (price === "mid") filtered = filtered.filter(p => p.price * INR_RATE >= 1000 && p.price * INR_RATE <= 3000);
  else if (price === "high") filtered = filtered.filter(p => p.price * INR_RATE > 3000);

  // 3️⃣ Search
  const search = document.getElementById("searchInput")?.value.toLowerCase();
  if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search));

  displayProducts(filtered);
}

//Event Listener@filter

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Highlight selected button
    document.querySelectorAll(".filter-btn").forEach(b =>
      b.classList.remove("bg-[#073a7a]", "text-white")
    );
    btn.classList.add("bg-[#073a7a]", "text-white");

    // Set selected category and filter
    selectedCategory = btn.dataset.category;
    filterProducts();
  });
});


// Category Reset
function resetCategoryUI() {
  const buttons = document.querySelectorAll(".filter-btn")

  buttons.forEach(btn => {
    btn.classList.remove("bg-[#073a7a]", "text-white")
  })

  const allBtn = document.querySelector('[data-category="all"]')

  if (allBtn) {
    allBtn.classList.add("bg-[#073a7a]", "text-white")
  }
}
// ================= EVENT DELEGATION (NO RELOAD) =================

document.addEventListener("click", function(e) {

  let needToRefreshProducts = false;

  if (e.target.classList.contains("inc-btn")) {
    const i = e.target.dataset.i;
    cart[i].qty++;
  }

  if (e.target.classList.contains("dec-btn")) {
    const i = e.target.dataset.i;
    if (cart[i].qty > 1) cart[i].qty--;
    else {
      cart.splice(i, 1);
      needToRefreshProducts = true; // product removed, button should revert
    }
  }

  if (e.target.classList.contains("del-btn")) {
    const i = e.target.dataset.i;
    cart.splice(i, 1);
    needToRefreshProducts = true; // product removed
  }

  if (
    e.target.classList.contains("inc-btn") ||
    e.target.classList.contains("dec-btn") ||
    e.target.classList.contains("del-btn")
  ) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    renderCart();

    // 🔹 Refresh product buttons to reflect cart changes
    if (needToRefreshProducts) {
      displayProducts(products);
    }
  }

});

// ================= EVENTS =================
document.getElementById("cartBtn").addEventListener("click", openCart)
document.getElementById("priceFilter").addEventListener("change", filterProducts); //Price
document.getElementById("searchInput").addEventListener("input", filterProducts); //Search