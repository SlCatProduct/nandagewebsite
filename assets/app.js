import { FIREBASE_COLLECTIONS, FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase-config.js";

const STORE = {
  name: "Nandage Home Store",
  whatsappNumber: "94771234567",
  deliveryNote: "Delivery fee depends on your area.",
  deliveryAreas: [
    { name: "Nearby area", fee: 300, eta: "Same day / next day" },
    { name: "Town area", fee: 450, eta: "Same day / next day" },
    { name: "Outside town", fee: 650, eta: "Next day" },
    { name: "Custom area", fee: 0, eta: "Confirm on WhatsApp" },
  ],
};

const DEFAULT_PRODUCTS = [
  {
    id: "electric-kettle-18l",
    name: "Electric Kettle 1.8L",
    category: "Kitchen & Dining",
    unit: "1.8L",
    price: 3200,
    oldPrice: 3900,
    discount: 18,
    stock: 6,
    reviews: "Best seller",
    tone: "sky",
    monogram: "Electric Kettle",
    description: "Quick-boil stainless steel kettle for tea, coffee and daily kitchen use.",
    features: ["1.8L family size", "Auto cut-off safety", "Home delivery available"],
    imageUrl: "",
    status: "active",
    sortOrder: 10,
    featured: true,
  },
  {
    id: "rice-cooker-18l",
    name: "Rice Cooker 1.8L",
    category: "Kitchen & Dining",
    unit: "1.8L",
    price: 7490,
    oldPrice: 8500,
    discount: 12,
    stock: 3,
    reviews: "Popular",
    tone: "mint",
    monogram: "Rice Cooker",
    description: "Easy daily cooking rice cooker with warm mode for family meals.",
    features: ["Cook and warm functions", "Family-size capacity", "COD or online payment"],
    imageUrl: "",
    status: "active",
    sortOrder: 20,
    featured: true,
  },
  {
    id: "non-stick-pan-28cm",
    name: "Non-stick Frying Pan",
    category: "Kitchen & Dining",
    unit: "28cm",
    price: 2350,
    oldPrice: 2900,
    discount: 19,
    stock: 8,
    reviews: "No reviews",
    tone: "amber",
    monogram: "Frying Pan",
    description: "Non-stick pan for breakfast, curries, eggs and everyday cooking.",
    features: ["28cm cooking surface", "Easy-clean coating", "Suitable for daily use"],
    imageUrl: "",
    status: "active",
    sortOrder: 30,
  },
  {
    id: "storage-container-set",
    name: "Storage Container Set",
    category: "Kitchen & Dining",
    unit: "12 Pcs",
    price: 1250,
    oldPrice: 1700,
    discount: 26,
    stock: 10,
    reviews: "Popular",
    tone: "coral",
    monogram: "Containers",
    description: "Food storage container set for kitchen shelves, leftovers and meal prep.",
    features: ["12-piece set", "Stackable design", "Useful for dry food and leftovers"],
    imageUrl: "",
    status: "active",
    sortOrder: 40,
    featured: true,
  },
  {
    id: "laundry-powder-1kg",
    name: "Laundry Powder",
    category: "Cleaning & Laundry",
    unit: "1kg",
    price: 780,
    oldPrice: 950,
    discount: 18,
    stock: 14,
    reviews: "In stock",
    tone: "sky",
    monogram: "Laundry Powder",
    description: "Daily-use washing powder for clothes, bedsheets and towels.",
    features: ["1kg pack", "Fresh fragrance", "Order multiple packs for delivery"],
    imageUrl: "",
    status: "active",
    sortOrder: 50,
    featured: true,
  },
  {
    id: "dishwash-liquid-1l",
    name: "Dish Wash Liquid",
    category: "Cleaning & Laundry",
    unit: "1L",
    price: 680,
    oldPrice: 820,
    discount: 17,
    stock: 12,
    reviews: "In stock",
    tone: "coral",
    monogram: "Dish Wash",
    description: "Grease-cutting liquid for plates, pans and kitchen cleaning.",
    features: ["1L family bottle", "Lemon-fresh clean", "Suitable for daily dishwashing"],
    imageUrl: "",
    status: "active",
    sortOrder: 60,
  },
  {
    id: "floor-cleaner-1l",
    name: "Floor Cleaner",
    category: "Cleaning & Laundry",
    unit: "1L",
    price: 550,
    oldPrice: 680,
    discount: 19,
    stock: 16,
    reviews: "No reviews",
    tone: "mint",
    monogram: "Floor Cleaner",
    description: "Floor cleaning liquid for tiles, pantry, living room and bathroom areas.",
    features: ["1L bottle", "Fresh home fragrance", "Good for daily mopping"],
    imageUrl: "",
    status: "active",
    sortOrder: 70,
  },
  {
    id: "spin-mop-set",
    name: "Spin Mop Set",
    category: "Cleaning & Laundry",
    unit: "Bucket Set",
    price: 2490,
    oldPrice: 3200,
    discount: 22,
    stock: 5,
    reviews: "Best seller",
    tone: "violet",
    monogram: "Spin Mop",
    description: "Bucket and spin mop set for quick home cleaning with less effort.",
    features: ["Bucket with spinner", "Reusable mop head", "Good for tiled floors"],
    imageUrl: "",
    status: "active",
    sortOrder: 80,
  },
  {
    id: "led-bulb-pack",
    name: "LED Bulb Pack",
    category: "Home Essentials",
    unit: "4 Pcs",
    price: 1200,
    oldPrice: 1600,
    discount: 25,
    stock: 9,
    reviews: "In stock",
    tone: "mint",
    monogram: "LED Bulbs",
    description: "Energy-saving LED bulbs for bedrooms, kitchen, hall and outdoor lights.",
    features: ["4 bulbs in one pack", "Energy-saving lighting", "Useful spare set for home"],
    imageUrl: "",
    status: "active",
    sortOrder: 90,
  },
  {
    id: "mosquito-vaporizer-kit",
    name: "Mosquito Vaporizer Kit",
    category: "Home Essentials",
    unit: "Starter Kit",
    price: 990,
    oldPrice: 1250,
    discount: 21,
    stock: 7,
    reviews: "No reviews",
    tone: "amber",
    monogram: "Vaporizer",
    description: "Plug-in mosquito vaporizer kit for bedrooms and living areas.",
    features: ["Starter kit", "Bedroom-friendly use", "Refill support on request"],
    imageUrl: "",
    status: "active",
    sortOrder: 100,
  },
  {
    id: "extension-cord-5m",
    name: "Extension Cord",
    category: "Home Essentials",
    unit: "5m",
    price: 1850,
    oldPrice: 2300,
    discount: 20,
    stock: 6,
    reviews: "Limited",
    tone: "sky",
    monogram: "Extension Cord",
    description: "Useful extension cord for rooms, appliances, study tables and TV areas.",
    features: ["5m cable length", "Multi-socket support", "Everyday home utility"],
    imageUrl: "",
    status: "active",
    sortOrder: 110,
  },
  {
    id: "bath-towel-pack",
    name: "Bath Towel Pack",
    category: "Bathroom & Bedroom",
    unit: "2 Pcs",
    price: 1590,
    oldPrice: 2100,
    discount: 24,
    stock: 8,
    reviews: "No reviews",
    tone: "violet",
    monogram: "Bath Towels",
    description: "Soft towel pack for bathroom, guest room and family use.",
    features: ["2 towels per pack", "Soft daily-use fabric", "Easy home delivery"],
    imageUrl: "",
    status: "active",
    sortOrder: 120,
  },
  {
    id: "bedsheet-set",
    name: "Bedsheet Set",
    category: "Bathroom & Bedroom",
    unit: "Queen",
    price: 2850,
    oldPrice: 3500,
    discount: 19,
    stock: 4,
    reviews: "Popular",
    tone: "amber",
    monogram: "Bedsheet Set",
    description: "Comfortable bedsheet set for bedroom refresh and daily use.",
    features: ["Queen size set", "Soft cotton-blend fabric", "Good gift or home item"],
    imageUrl: "",
    status: "active",
    sortOrder: 130,
  },
  {
    id: "diaper-pack-medium",
    name: "Baby Diaper Pack",
    category: "Baby & Personal Care",
    unit: "M / 50 Pcs",
    price: 3850,
    oldPrice: 4300,
    discount: 10,
    stock: 5,
    reviews: "In stock",
    tone: "coral",
    monogram: "Baby Diapers",
    description: "Medium-size diaper pack for daily baby care and monthly household needs.",
    features: ["50 pieces per pack", "Medium size", "Delivery to home available"],
    imageUrl: "",
    status: "active",
    sortOrder: 140,
  },
  {
    id: "shampoo-bodywash-combo",
    name: "Shampoo + Body Wash Combo",
    category: "Baby & Personal Care",
    unit: "Combo",
    price: 1450,
    oldPrice: 1800,
    discount: 19,
    stock: 7,
    reviews: "No reviews",
    tone: "mint",
    monogram: "Care Combo",
    description: "Personal care combo for bathroom shelves and family use.",
    features: ["Two-item combo", "Daily personal care", "Add to grocery-style orders"],
    imageUrl: "",
    status: "active",
    sortOrder: 150,
  },
];

const BASE_CATEGORY_ORDER = [
  "Kitchen & Dining",
  "Cleaning & Laundry",
  "Home Essentials",
  "Bathroom & Bedroom",
  "Baby & Personal Care",
];

const state = {
  category: "All",
  query: "",
  checkoutMode: "cart",
  checkoutProductId: "",
  selectedProductId: "",
};

let products = DEFAULT_PRODUCTS.map(normalizeProduct);
let reviews = [];
let cart = loadCart();
let firebaseDb = null;
let firebaseFirestore = null;
let unsubscribeProducts = null;
let unsubscribeReviews = null;

const money = new Intl.NumberFormat("en-LK");

const els = {
  featured: document.querySelector("[data-featured-products]"),
  sections: document.querySelector("[data-product-sections]"),
  tabs: document.querySelector("[data-category-tabs]"),
  search: document.querySelector("[data-search-input]"),
  menuToggle: document.querySelector("[data-menu-toggle]"),
  nav: document.querySelector("[data-nav]"),
  dialog: document.querySelector("[data-product-dialog]"),
  dialogClose: document.querySelector("[data-dialog-close]"),
  catalogStatus: document.querySelector("[data-catalog-status]"),
  cartOpen: document.querySelector("[data-cart-open]"),
  cartCount: document.querySelector("[data-cart-count]"),
  checkoutDialog: document.querySelector("[data-checkout-dialog]"),
  checkoutClose: document.querySelector("[data-checkout-close]"),
  checkoutForm: document.querySelector("[data-checkout-form]"),
  checkoutMessage: document.querySelector("[data-checkout-message]"),
  cartItems: document.querySelector("[data-cart-items]"),
  deliveryArea: document.querySelector("[data-delivery-area]"),
  cartSubtotal: document.querySelector("[data-cart-subtotal]"),
  cartDelivery: document.querySelector("[data-cart-delivery]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  reviewForm: document.querySelector("[data-review-form]"),
  reviewList: document.querySelector("[data-dialog-reviews]"),
  reviewSummary: document.querySelector("[data-review-summary]"),
  reviewMessage: document.querySelector("[data-review-message]"),
};

function formatPrice(value) {
  return `Rs. ${money.format(Number(value) || 0)}`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char];
  });
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("nandage-cart") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("nandage-cart", JSON.stringify(cart));
}

function orderId() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `NH-${stamp}-${random}`;
}

function normalizeProduct(product) {
  const oldPrice = Number(product.oldPrice) || 0;
  const price = Number(product.price) || 0;
  const discount =
    Number(product.discount) ||
    (oldPrice > price && oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);

  return {
    id: product.id || product.slug || crypto.randomUUID(),
    name: product.name || "Untitled Product",
    category: product.category || "Home Essentials",
    unit: product.unit || product.duration || "1 Pc",
    price,
    oldPrice,
    discount,
    stock: Number(product.stock) || 0,
    reviews: product.reviews || "In stock",
    tone: product.tone || "mint",
    monogram: product.monogram || product.name || "Product",
    description: product.description || "",
    features: Array.isArray(product.features)
      ? product.features.filter(Boolean)
      : String(product.features || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
    imageUrl: product.imageUrl || "",
    status: product.status || "active",
    sortOrder: Number(product.sortOrder) || 9999,
    featured: Boolean(product.featured),
  };
}

function getCategoryOrder() {
  const seen = new Set(BASE_CATEGORY_ORDER);
  const dynamic = products
    .map((product) => product.category)
    .filter((category) => category && !seen.has(category));
  dynamic.forEach((category) => seen.add(category));
  return [...BASE_CATEGORY_ORDER, ...dynamic];
}

function sortedProducts(items = products) {
  return [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
}

function getOrderUrl(product) {
  const message = product
    ? [
        `Hello ${STORE.name}, I want to order this product.`,
        "",
        `Item: ${product.name}`,
        `Size / Pack: ${product.unit}`,
        `Unit Price: ${formatPrice(product.price)}`,
        `Category: ${product.category}`,
        `Item ID: ${product.id}`,
        "Quantity: 1",
        "",
        "Delivery method: Home delivery",
        "Payment: Cash on Delivery / Bank transfer / Online payment",
        `Note: ${STORE.deliveryNote}`,
        "",
        "Name:",
        "Delivery address:",
        "Phone:",
        "",
        "Please confirm stock, delivery fee and total bill.",
      ].join("\n")
    : [
        `Hello ${STORE.name}, I need to place a home delivery order.`,
        "",
        "Items:",
        "Delivery area:",
        "Payment: Cash on Delivery / Bank transfer / Online payment",
        "",
        "Please confirm stock, delivery fee and total bill.",
      ].join("\n");

  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function productMedia(product) {
  const badge = product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : "";

  if (product.imageUrl) {
    return `
      <div class="product-media has-image" role="img" aria-label="${escapeHtml(product.name)} product image">
        ${badge}
        <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="product-media tone-${product.tone}" role="img" aria-label="${escapeHtml(product.name)} product artwork">
      ${badge}
      <div class="media-copy">
        <span>${escapeHtml(product.unit)}</span>
        <strong>${escapeHtml(product.monogram)}</strong>
      </div>
    </div>
  `;
}

function productCard(product) {
  const stockLabel = product.stock <= 0 ? "Out of stock" : `${product.stock} left`;
  const stockClass = product.stock <= 2 ? "stock-pill is-low" : "stock-pill";

  return `
    <article class="product-card" data-product-card data-product-id="${escapeHtml(product.id)}">
      ${productMedia(product)}
      <div class="product-body">
        <div class="product-title-row">
          <h3>${escapeHtml(product.name)}</h3>
          <span class="reviews">${escapeHtml(product.reviews)}</span>
        </div>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <div class="price-row">
          <div>
            <span class="price">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
          </div>
          <span class="plan-pill">${escapeHtml(product.unit)}</span>
        </div>
        <span class="${stockClass}">${stockLabel}</span>
        <div class="card-actions">
          <button class="card-button" type="button" data-view-product="${escapeHtml(product.id)}">View Product</button>
          <div class="mini-actions">
            <button class="card-button" type="button" data-add-cart="${escapeHtml(product.id)}">Add to Cart</button>
            <button class="order-button" type="button" data-order-product="${escapeHtml(product.id)}">Order Now</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const activeProducts = sortedProducts(products).filter((product) => product.status === "active");
  const preferredProducts = activeProducts.filter((product) => product.featured);
  const featuredProducts = (preferredProducts.length ? preferredProducts : activeProducts).slice(0, 4);

  els.featured.innerHTML = featuredProducts
    .map(
      (product) => `
        <a class="deal-tile" href="${getOrderUrl(product)}" target="_blank" rel="noopener" aria-label="Order ${escapeHtml(product.name)}">
          <span class="deal-tag">${escapeHtml(product.unit)}</span>
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(product.category)}</span>
          <b>${formatPrice(product.price)}</b>
        </a>
      `,
    )
    .join("");
}

function renderTabs() {
  const categories = ["All", ...getCategoryOrder()];

  if (state.category !== "All" && !categories.includes(state.category)) {
    state.category = "All";
  }

  els.tabs.innerHTML = categories
    .map(
      (category) => `
        <button class="category-tab" type="button" role="tab" aria-selected="${category === state.category}" data-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `,
    )
    .join("");
}

function matchesProduct(product) {
  const query = state.query.trim().toLowerCase();
  const categoryMatch = state.category === "All" || product.category === state.category;
  const queryMatch =
    !query ||
    [product.name, product.category, product.description, product.unit, product.monogram, product.reviews]
      .join(" ")
      .toLowerCase()
      .includes(query);

  return product.status === "active" && categoryMatch && queryMatch;
}

function renderProducts() {
  const visibleProducts = sortedProducts(products).filter(matchesProduct);

  if (!visibleProducts.length) {
    els.sections.innerHTML = `<div class="empty-state">No products found. Try another search or category.</div>`;
    return;
  }

  const sections = getCategoryOrder()
    .map((category) => {
      const categoryProducts = visibleProducts.filter((product) => product.category === category);
      if (!categoryProducts.length) return "";

      return `
        <section class="category-section" data-category-section="${escapeHtml(category)}">
          <div class="category-heading">
            <h2>${escapeHtml(category)}</h2>
            <button class="view-link" type="button" data-filter-category="${escapeHtml(category)}">View all -></button>
          </div>
          <div class="category-grid">
            ${categoryProducts.map(productCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  els.sections.innerHTML = sections;
}

function syncStoreLinks() {
  document.querySelectorAll("[data-store-order]").forEach((link) => {
    link.href = getOrderUrl();
  });
}

function populateDeliveryAreas() {
  els.deliveryArea.innerHTML = STORE.deliveryAreas
    .map((area) => `<option value="${escapeHtml(area.name)}">${escapeHtml(area.name)} - ${formatPrice(area.fee)}</option>`)
    .join("");
}

function getDeliveryArea() {
  const selected = els.deliveryArea.value || STORE.deliveryAreas[0].name;
  return STORE.deliveryAreas.find((area) => area.name === selected) || STORE.deliveryAreas[0];
}

function productById(productId) {
  return products.find((product) => product.id === productId);
}

function cartProducts() {
  return cart
    .map((item) => {
      const product = productById(item.id);
      if (!product) return null;
      return { ...product, qty: Math.max(1, Number(item.qty) || 1) };
    })
    .filter(Boolean);
}

function checkoutProducts() {
  if (state.checkoutMode === "single") {
    const product = productById(state.checkoutProductId);
    return product ? [{ ...product, qty: 1 }] : [];
  }
  return cartProducts();
}

function cartTotals(items = checkoutProducts()) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = items.length ? getDeliveryArea().fee : 0;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
  };
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  els.cartCount.textContent = count;
}

function addToCart(productId, qty = 1, open = false) {
  const product = productById(productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty = Math.min(99, existing.qty + qty);
  } else {
    cart.push({ id: productId, qty });
  }

  saveCart();
  updateCartCount();
  if (open) openCheckout("cart");
}

function setCartQty(productId, qty) {
  cart = cart
    .map((item) => (item.id === productId ? { ...item, qty: Math.max(0, qty) } : item))
    .filter((item) => item.qty > 0);
  saveCart();
  updateCartCount();
  renderCart();
}

function renderCart() {
  const items = checkoutProducts();

  if (!items.length) {
    els.cartItems.innerHTML = `<div class="empty-state">Your cart is empty. Add products before checkout.</div>`;
  } else {
    els.cartItems.innerHTML = items
      .map((item) => {
        const thumb = item.imageUrl
          ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" />`
          : `<span>${escapeHtml(item.monogram || item.name)}</span>`;
        const qtyControls =
          state.checkoutMode === "cart"
            ? `
              <div class="qty-control" data-cart-row="${escapeHtml(item.id)}">
                <button type="button" data-cart-dec="${escapeHtml(item.id)}">-</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-inc="${escapeHtml(item.id)}">+</button>
              </div>
            `
            : `<strong>${item.qty}</strong>`;

        return `
          <article class="cart-row">
            <div class="cart-thumb">${thumb}</div>
            <div>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.unit)} | ${formatPrice(item.price)} | ${formatPrice(item.price * item.qty)}</p>
            </div>
            ${qtyControls}
          </article>
        `;
      })
      .join("");
  }

  const totals = cartTotals(items);
  els.cartSubtotal.textContent = formatPrice(totals.subtotal);
  els.cartDelivery.textContent = formatPrice(totals.delivery);
  els.cartTotal.textContent = formatPrice(totals.total);
}

function openCheckout(mode = "cart", productId = "") {
  state.checkoutMode = mode;
  state.checkoutProductId = productId;
  renderCart();
  els.checkoutMessage.textContent = isFirebaseConfigured()
    ? "Order will be saved to Firebase and opened in WhatsApp."
    : "Firebase config missing. Order will open in WhatsApp only.";
  document.body.classList.add("dialog-open");
  if (typeof els.checkoutDialog.showModal === "function") {
    els.checkoutDialog.showModal();
  } else {
    els.checkoutDialog.setAttribute("open", "");
  }
}

function closeCheckout() {
  if (els.checkoutDialog.open) {
    els.checkoutDialog.close();
  }
  document.body.classList.remove("dialog-open");
}

function whatsappOrderMessage(payload) {
  const lines = [
    `Hello ${STORE.name}, I want to place this order.`,
    "",
    `Order ID: ${payload.id}`,
    `Customer: ${payload.customerName}`,
    `Phone: ${payload.customerPhone}`,
    `Address: ${payload.customerAddress}`,
    `Delivery area: ${payload.deliveryArea}`,
    `Payment: ${payload.paymentMethod}`,
    "",
    "Items:",
    ...payload.items.map(
      (item, index) => `${index + 1}. ${item.name} (${item.unit}) x ${item.qty} - ${formatPrice(item.lineTotal)}`,
    ),
    "",
    `Subtotal: ${formatPrice(payload.subtotal)}`,
    `Delivery: ${formatPrice(payload.deliveryFee)}`,
    `Total: ${formatPrice(payload.total)}`,
  ];

  if (payload.note) {
    lines.push("", `Note: ${payload.note}`);
  }

  lines.push("", "Please confirm stock, delivery fee and total bill.");
  return lines.join("\n");
}

function renderProductReviews(productId) {
  const productReviews = reviews
    .filter((review) => review.productId === productId && review.status === "approved")
    .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));

  if (!productReviews.length) {
    els.reviewSummary.textContent = "No reviews yet";
    els.reviewList.innerHTML = `<div class="empty-state">No approved reviews yet.</div>`;
    return;
  }

  const average = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
  els.reviewSummary.textContent = `${average.toFixed(1)} / 5 from ${productReviews.length} review${productReviews.length === 1 ? "" : "s"}`;
  els.reviewList.innerHTML = productReviews
    .slice(0, 4)
    .map(
      (review) => `
        <article class="review-item">
          <strong>${escapeHtml(review.customerName)}</strong>
          <span>${review.rating}/5 stars</span>
          <p>${escapeHtml(review.comment)}</p>
        </article>
      `,
    )
    .join("");
}

function setCatalogStatus(message) {
  if (els.catalogStatus) {
    els.catalogStatus.textContent = message;
  }
}

function setCategory(category) {
  state.category = category;
  renderTabs();
  renderProducts();
}

function renderAll(statusMessage) {
  syncStoreLinks();
  renderFeatured();
  renderTabs();
  renderProducts();
  updateCartCount();
  if (statusMessage) setCatalogStatus(statusMessage);
}

function setDialogImage(product) {
  const art = els.dialog.querySelector("[data-dialog-art]");
  art.className = `dialog-art tone-${product.tone}`;
  art.style.backgroundImage = "";

  if (product.imageUrl) {
    art.classList.add("has-image");
    art.style.backgroundImage = `linear-gradient(rgba(7, 24, 39, 0.26), rgba(7, 24, 39, 0.62)), url("${product.imageUrl}")`;
  }
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  state.selectedProductId = product.id;
  setDialogImage(product);
  els.dialog.querySelector("[data-dialog-discount]").textContent = product.discount ? `-${product.discount}%` : "Deal";
  els.dialog.querySelector("[data-dialog-monogram]").textContent = product.monogram;
  els.dialog.querySelector("[data-dialog-category]").textContent = product.category;
  els.dialog.querySelector("[data-dialog-duration]").textContent = product.unit;
  els.dialog.querySelector("[data-dialog-title]").textContent = product.name;
  els.dialog.querySelector("[data-dialog-description]").textContent = product.description;
  els.dialog.querySelector("[data-dialog-price]").textContent = formatPrice(product.price);
  els.dialog.querySelector("[data-dialog-old-price]").textContent = product.oldPrice ? formatPrice(product.oldPrice) : "";
  els.dialog.querySelector("[data-dialog-features]").innerHTML = product.features
    .map((feature) => `<li>${escapeHtml(feature)}</li>`)
    .join("");
  els.dialog.querySelector("[data-dialog-order]").dataset.orderProduct = product.id;
  els.dialog.querySelector("[data-dialog-cart]").dataset.addCart = product.id;
  els.reviewForm.reset();
  els.reviewMessage.textContent = "";
  renderProductReviews(product.id);

  document.body.classList.add("dialog-open");
  if (typeof els.dialog.showModal === "function") {
    els.dialog.showModal();
  } else {
    els.dialog.setAttribute("open", "");
  }
}

function closeProduct() {
  if (els.dialog.open) {
    els.dialog.close();
  }
  document.body.classList.remove("dialog-open");
}

async function submitCheckout(event) {
  event.preventDefault();
  const items = checkoutProducts();

  if (!items.length) {
    els.checkoutMessage.textContent = "Add at least one product before checkout.";
    return;
  }

  const form = new FormData(els.checkoutForm);
  const deliveryArea = getDeliveryArea();
  const totals = cartTotals(items);
  const id = orderId();
  const payload = {
    id,
    status: "pending",
    customerName: String(form.get("customerName") || "").trim(),
    customerPhone: String(form.get("customerPhone") || "").trim(),
    customerAddress: String(form.get("customerAddress") || "").trim(),
    deliveryArea: deliveryArea.name,
    deliveryFee: deliveryArea.fee,
    deliveryEta: deliveryArea.eta,
    paymentMethod: String(form.get("paymentMethod") || "").trim(),
    note: String(form.get("note") || "").trim(),
    items: items.map((item) => ({
      productId: item.id,
      name: item.name,
      unit: item.unit,
      price: item.price,
      qty: item.qty,
      lineTotal: item.price * item.qty,
    })),
    subtotal: totals.subtotal,
    total: totals.total,
    source: "website",
  };

  if (!payload.customerName || !payload.customerPhone || !payload.customerAddress) {
    els.checkoutMessage.textContent = "Please fill name, phone and delivery address.";
    return;
  }

  els.checkoutMessage.textContent = "Preparing WhatsApp order...";

  try {
    if (firebaseDb && firebaseFirestore) {
      const { doc, setDoc, serverTimestamp } = firebaseFirestore;
      await setDoc(doc(firebaseDb, FIREBASE_COLLECTIONS.orders, id), {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      els.checkoutMessage.textContent = "Order saved. Opening WhatsApp...";
    }

    const url = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(whatsappOrderMessage(payload))}`;
    window.open(url, "_blank", "noopener");

    if (state.checkoutMode === "cart") {
      cart = [];
      saveCart();
      updateCartCount();
    }
    renderCart();
  } catch (error) {
    console.error(error);
    els.checkoutMessage.textContent = "Order could not be saved to Firebase. Opening WhatsApp only.";
    const url = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(whatsappOrderMessage(payload))}`;
    window.open(url, "_blank", "noopener");
  }
}

async function submitReview(event) {
  event.preventDefault();

  if (!state.selectedProductId) return;

  if (!firebaseDb || !firebaseFirestore) {
    els.reviewMessage.textContent = "Firebase config is needed before reviews can be submitted.";
    return;
  }

  const form = new FormData(els.reviewForm);
  const payload = {
    productId: state.selectedProductId,
    customerName: String(form.get("customerName") || "").trim(),
    rating: Number(form.get("rating")) || 5,
    comment: String(form.get("comment") || "").trim(),
    status: "pending",
  };

  if (!payload.customerName || !payload.comment) {
    els.reviewMessage.textContent = "Please add your name and review.";
    return;
  }

  try {
    const { addDoc, collection, serverTimestamp } = firebaseFirestore;
    await addDoc(collection(firebaseDb, FIREBASE_COLLECTIONS.reviews), {
      ...payload,
      createdAt: serverTimestamp(),
    });
    els.reviewForm.reset();
    els.reviewMessage.textContent = "Review submitted. It will appear after admin approval.";
  } catch (error) {
    console.error(error);
    els.reviewMessage.textContent = "Could not submit review. Check Firebase rules.";
  }
}

function attachEvents() {
  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderProducts();
  });

  els.tabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-category]");
    if (!tab) return;
    setCategory(tab.dataset.category);
  });

  els.sections.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-product]");
    const filterButton = event.target.closest("[data-filter-category]");
    const addButton = event.target.closest("[data-add-cart]");
    const orderButton = event.target.closest("[data-order-product]");

    if (viewButton) {
      openProduct(viewButton.dataset.viewProduct);
    }

    if (addButton) {
      addToCart(addButton.dataset.addCart, 1, false);
    }

    if (orderButton) {
      openCheckout("single", orderButton.dataset.orderProduct);
    }

    if (filterButton) {
      setCategory(filterButton.dataset.filterCategory);
      document.querySelector("#products").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.querySelectorAll("[data-category-shortcut]").forEach((shortcut) => {
    shortcut.addEventListener("click", () => {
      setCategory(shortcut.dataset.categoryShortcut);
    });
  });

  els.menuToggle.addEventListener("click", () => {
    const expanded = els.menuToggle.getAttribute("aria-expanded") === "true";
    els.menuToggle.setAttribute("aria-expanded", String(!expanded));
    els.nav.classList.toggle("is-open", !expanded);
  });

  els.nav.addEventListener("click", () => {
    els.menuToggle.setAttribute("aria-expanded", "false");
    els.nav.classList.remove("is-open");
  });

  els.dialogClose.addEventListener("click", closeProduct);
  els.dialog.addEventListener("click", (event) => {
    if (event.target === els.dialog) closeProduct();
  });
  els.dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

  els.dialog.querySelector("[data-dialog-cart]").addEventListener("click", (event) => {
    addToCart(event.currentTarget.dataset.addCart, 1, false);
  });

  els.dialog.querySelector("[data-dialog-order]").addEventListener("click", (event) => {
    closeProduct();
    openCheckout("single", event.currentTarget.dataset.orderProduct);
  });

  els.cartOpen.addEventListener("click", () => openCheckout("cart"));
  els.checkoutClose.addEventListener("click", closeCheckout);
  els.checkoutDialog.addEventListener("click", (event) => {
    if (event.target === els.checkoutDialog) closeCheckout();
  });
  els.checkoutDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  els.checkoutForm.addEventListener("submit", submitCheckout);
  els.deliveryArea.addEventListener("change", renderCart);

  els.cartItems.addEventListener("click", (event) => {
    const inc = event.target.closest("[data-cart-inc]");
    const dec = event.target.closest("[data-cart-dec]");
    if (inc) {
      const current = cart.find((item) => item.id === inc.dataset.cartInc);
      setCartQty(inc.dataset.cartInc, (current?.qty || 0) + 1);
    }
    if (dec) {
      const current = cart.find((item) => item.id === dec.dataset.cartDec);
      setCartQty(dec.dataset.cartDec, (current?.qty || 0) - 1);
    }
  });

  els.reviewForm.addEventListener("submit", submitReview);
}

async function startFirebaseCatalog() {
  if (!isFirebaseConfigured()) {
    setCatalogStatus("Demo catalog. Add Firebase config to enable live products.");
    return;
  }

  try {
    const [{ initializeApp }, firestore] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"),
    ]);

    const {
      addDoc,
      collection,
      doc,
      getFirestore,
      onSnapshot,
      query,
      serverTimestamp,
      setDoc,
      where,
    } = firestore;

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);
    firebaseDb = db;
    firebaseFirestore = {
      addDoc,
      collection,
      doc,
      serverTimestamp,
      setDoc,
    };
    const productsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.products),
      where("status", "==", "active"),
    );
    const reviewsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.reviews),
      where("status", "==", "approved"),
    );

    setCatalogStatus("Connecting to Firebase catalog...");

    unsubscribeProducts = onSnapshot(
      productsQuery,
      (snapshot) => {
        const firebaseProducts = snapshot.docs.map((doc) => normalizeProduct({ id: doc.id, ...doc.data() }));
        if (firebaseProducts.length) {
          products = firebaseProducts;
          renderAll("Live from Firebase.");
        } else {
          products = DEFAULT_PRODUCTS.map(normalizeProduct);
          renderAll("Firebase connected. No products yet, showing demo catalog.");
        }
      },
      (error) => {
        console.error(error);
        setCatalogStatus("Firebase read blocked. Check Firestore rules/admin setup.");
      },
    );

    unsubscribeReviews = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        reviews = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            productId: data.productId || "",
            customerName: data.customerName || "Customer",
            rating: Number(data.rating) || 5,
            comment: data.comment || "",
            status: data.status || "approved",
            createdAtMs: data.createdAt?.toMillis ? data.createdAt.toMillis() : 0,
          };
        });
        if (state.selectedProductId) {
          renderProductReviews(state.selectedProductId);
        }
      },
      (error) => {
        console.error(error);
      },
    );
  } catch (error) {
    console.error(error);
    setCatalogStatus("Firebase SDK could not load. Showing demo catalog.");
  }
}

function initCustomCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("custom-cursor-active");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const moveCursor = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  };

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  };

  const setCursorState = (event) => {
    const target = event.target;
    const typingTarget = target.closest("input, textarea, select");
    const interactiveTarget = target.closest(
      "a, button, .product-card, .deal-tile, .category-tab, .cart-row, .review-item",
    );

    document.body.classList.toggle("cursor-typing", Boolean(typingTarget));
    document.body.classList.toggle("cursor-interactive", Boolean(interactiveTarget) && !typingTarget);
  };

  window.addEventListener("mousemove", moveCursor, { passive: true });
  document.addEventListener("mouseover", setCursorState);
  document.addEventListener("mouseout", setCursorState);
  animateRing();
}

function init() {
  initCustomCursor();
  populateDeliveryAreas();
  renderAll("Loading catalog...");
  attachEvents();
  startFirebaseCatalog();
}

window.addEventListener("beforeunload", () => {
  if (unsubscribeProducts) unsubscribeProducts();
  if (unsubscribeReviews) unsubscribeReviews();
});

init();
