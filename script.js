// document.addEventListener("click", function(e) {
//   if (e.target.tagName === "BUTTON") {
//     e.preventDefault()
//   }
// })
// // ================= API =================
// const API_URL = "https://fakestoreapi.com/products"
// const INR_RATE = 85

// let products = []

// async function getProducts() {
//   const res = await fetch(API_URL)
//   products = await res.json()
//   displayProducts(products)
// }
// getProducts()

// // ================= CART (LocalStorage) =================
// let cart = JSON.parse(localStorage.getItem("cart")) || []

// // ✅ Clean old invalid data (IMPORTANT FIX)
// cart = cart.filter(item => typeof item === "object" && item.price)

// localStorage.setItem("cart", JSON.stringify(cart))

// updateCartUI()

// // ================= DISPLAY PRODUCTS =================
// const container = document.getElementById("productContainer")
// const inCart = cart.find(item => item.id === products.id)

// function displayProducts(data) {
//   container.innerHTML = ""

//   data.forEach(product => {
//     const card = `
//     <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition">

//       <div class="overflow-hidden rounded-xl">
//         <img src="${product.image}" 
//           class="w-full h-48 object-cover hover:scale-105 transition">
//       </div>

//       <h2 class="mt-3 font-semibold text-[#073a7a]">${product.title}</h2>

//       <div class="flex justify-between items-center mt-1">
//         <p class="font-bold text-gray-800">₹${Math.round(product.price * INR_RATE)}</p>
//         <span class="text-sm text-yellow-500">⭐ ${product.rating.rate}</span>
//       </div>

//       <button 
//       type = 'button'
//   onclick='addToCart(${JSON.stringify(product)})'
//   class="mt-3 w-full py-2 rounded-lg transition
//   ${inCart 
//     ? "bg-green-500 text-white cursor-not-allowed" 
//     : "bg-[#073a7a] text-white hover:bg-[#052c5c]"}"
//   ${inCart ? "disabled" : ""}
// >
//   ${inCart ? "Added ✅" : "Add to Cart"}
// </button>

//     </div>
//     `
//     container.innerHTML += card
//   })
// }

// // ================= CATEGORY FILTER =================
// let selectedCategory = "all"

// document.querySelectorAll(".filter-btn").forEach(btn => {
//   btn.addEventListener("click", () => {

//     document.querySelectorAll(".filter-btn").forEach(b =>
//       b.classList.remove("bg-[#073a7a]", "text-white")
//     )

//     btn.classList.add("bg-[#073a7a]", "text-white")

//     selectedCategory = btn.dataset.category
//     filterProducts()
//   })
// })

// // ================= ADD TO CART =================

// function addToCart(product) {

//   //  check if already exists
//   const existing = cart.find(item => item.id === product.id)

//   if (existing) {
//     Swal.fire({
//       title: "Already in Cart ⚠️",
//       text: product.title,
//       icon: "warning",
//       timer: 1200,
//       showConfirmButton: false
//     })
//     return
//   }

//   // ✅ add with quantity
//   cart.push({ ...product, qty: 1 })

//   localStorage.setItem("cart", JSON.stringify(cart))
//   updateCartUI()
//   displayProducts(products) //  refresh 

//   Swal.fire({
//     title: "Added to Cart 🛒",
//     text: product.title,
//     icon: "success",
//     timer: 1200,
//     showConfirmButton: false
//   })
// }

// // ================= UPDATE CART COUNT =================
// function updateCartUI() {
//   const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
//   document.getElementById("cartCount").innerText = totalItems
// }

// // ================= FILTER PRODUCTS =================
// function filterProducts() {
//   let filtered = [...products]

//   const price = document.getElementById("priceFilter").value
//   const search = document.getElementById("searchInput").value.toLowerCase()

//   // Category
//   if (selectedCategory !== "all") {
//     filtered = filtered.filter(p => p.category === selectedCategory)
//   }

//   // Price
//   if (price === "low") {
//     filtered = filtered.filter(p => p.price * INR_RATE < 1000)
//   } else if (price === "mid") {
//     filtered = filtered.filter(p => p.price * INR_RATE >= 1000 && p.price * INR_RATE <= 3000)
//   } else if (price === "high") {
//     filtered = filtered.filter(p => p.price * INR_RATE > 3000)
//   }

//   // Search
//   if (search) {
//     filtered = filtered.filter(p =>
//       p.title.toLowerCase().includes(search)
//     )
//   }

//   displayProducts(filtered)
// }

// // ================= OPEN CART =================
// function openCart() {

//   if (cart.length === 0) {
//     Swal.fire("Cart is Empty 🛒")
//       // text: "Start shopping ",
//       // icon: "info"
    
//     return
//   }

//   let total = 0
//   let cartHTML = cart.map((item, index) => {

//   const price = Math.round(item.price * INR_RATE)
//   const itemTotal = price * item.qty
//   total += itemTotal

//   return `
//     <div class="border-b py-3">

//       <div class="flex justify-between items-center">
//         <div class="flex items-center gap-3">
//           <img src="${item.image}" class="w-10 h-10 object-contain">

//           <div>
//             <p class="font-semibold">${item.title}</p>
//             <p class="text-sm text-gray-500">
//               ₹${price} × ${item.qty} = 
//               <span class="font-bold text-[#073a7a]">₹${itemTotal}</span>
//             </p>
//           </div>
//         </div>

//         <div class="flex items-center gap-2">
//           <button type="button" onclick="decreaseQty(${index}, event)"
//   class="px-2 bg-gray-200 rounded">-</button>

// <span>${item.qty}</span>

// <button type="button" onclick="increaseQty(${index}, event)"
//   class="px-2 bg-gray-200 rounded">+</button>

// <button 
//   type="button"
//   onclick="removeFromCart(${index}, event)"
//   class="text-red-500 text-sm ml-2">
//   ❌
// </button>
//         </div>
//       </div>

//     </div>
//   `
// }).join("")

//   Swal.fire({
//     title: "Your Cart 🛒",
//     html: `
//       <div id="cartContent" class="text-left max-h-80 overflow-y-auto"></div>
//       <div class="mt-4 text-right font-bold">
//         Total: <span id="cartTotal"></span>
//       </div>
//     `,
//     width: 500,
//     confirmButtonText: "Pay Now 💳"
//   })
//   setTimeout(renderCartInsidePopup, 100)
// }

// //Quantity Managed
// function increaseQty(index, e) {
//   if (e) e.preventDefault()

//   cart[index].qty += 1
//   localStorage.setItem("cart", JSON.stringify(cart))
//   updateCartUI()

//   renderCartInsidePopup() // 👈 instead of openCart()
// }


// function decreaseQty(index, e) {
//   if (e) e.preventDefault()

//   if (cart[index].qty > 1) {
//     cart[index].qty -= 1
//   } else {
//     cart.splice(index, 1)
//   }

//   localStorage.setItem("cart", JSON.stringify(cart))
//   updateCartUI()

//   renderCartInsidePopup()
// }

// // ================= REMOVE ITEM =================
// function removeFromCart(index, e) {
//   if (e) e.preventDefault()

//   cart.splice(index, 1)
//   localStorage.setItem("cart", JSON.stringify(cart))
//   updateCartUI()
//   openCart()
// }
// // ==============Cart Render =========
// function renderCartInsidePopup() {
//   let total = 0

//   let cartHTML = cart.map((item, index) => {
//     const price = Math.round(item.price * INR_RATE)
//     const itemTotal = price * item.qty
//     total += itemTotal

//     return `
//       <div class="border-b py-3">
//         <div class="flex justify-between items-center">

//           <div class="flex items-center gap-3">
//             <img src="${item.image}" class="w-10 h-10">

//             <div>
//               <p class="font-semibold">${item.title}</p>
//               <p class="text-sm text-gray-500">
//                 ₹${price} × ${item.qty} = 
//                 <span class="font-bold text-[#073a7a]">₹${itemTotal}</span>
//               </p>
//             </div>
//           </div>

//           <div class="flex items-center gap-2">
//             <button type="button" onclick="decreaseQty(${index}, event)">-</button>
//             <span>${item.qty}</span>
//             <button type="button" onclick="increaseQty(${index}, event)">+</button>
//             <button type="button" onclick="removeFromCart(${index}, event)">❌</button>
//           </div>

//         </div>
//       </div>
//     `
//   }).join("")

//   document.getElementById("cartContent").innerHTML = cartHTML
//   document.getElementById("cartTotal").innerText = `₹${total}`
// }
// // ================= EVENT LISTENERS =================
// document.querySelectorAll("select").forEach(el =>
//   el.addEventListener("change", filterProducts)
// )

// document.getElementById("searchInput")
//   .addEventListener("input", filterProducts)

// document.getElementById("cartBtn")
//   .addEventListener("click", openCart)

// ================= API =================
const API_URL = "https://fakestoreapi.com/products"
const INR_RATE = 85

let products = []

async function getProducts() {
  const res = await fetch(API_URL)
  products = await res.json()
  displayProducts(products)
}
getProducts()

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

    // const card = `
    // <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition">

    //   <div class="overflow-hidden rounded-xl">
    //     <img src="${product.image}" 
    //       class="w-full h-48 object-cover">
    //   </div>

    //   <h2 class="mt-3 font-semibold text-[#073a7a]">${product.title}</h2>

    //   <div class="flex justify-between items-center mt-1">
    //     <p class="font-bold text-gray-800">₹${Math.round(product.price * INR_RATE)}</p>
    //     <span class="text-sm text-yellow-500">⭐ ${product.rating.rate}</span>
    //   </div>

    //   <button 
    //     onclick='addToCart(${JSON.stringify(product)})'
    //     type="button"
    //     class="mt-3 w-full py-2 rounded-lg transition
    //     ${inCart 
    //       ? "bg-green-500 text-white cursor-not-allowed" 
    //       : "bg-[#073a7a] text-white hover:bg-[#052c5c]"}"
    //     ${inCart ? "disabled" : ""}
    //   >
    //     ${inCart ? "Added ✅" : "Add to Cart"}
    //   </button>

    // </div>
    // `
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
  displayProducts(products)

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
      title: "Cart is Empty 🛒",
      text: "Start Shopping 😄",
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