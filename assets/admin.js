import { FIREBASE_COLLECTIONS, FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase-config.js";

const SAMPLE_PRODUCTS = [
  {
    id: "electric-kettle-18l",
    name: "Electric Kettle 1.8L",
    category: "Kitchen & Dining",
    unit: "1.8L",
    price: 3200,
    oldPrice: 3900,
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
    id: "laundry-powder-1kg",
    name: "Laundry Powder",
    category: "Cleaning & Laundry",
    unit: "1kg",
    price: 780,
    oldPrice: 950,
    stock: 14,
    reviews: "In stock",
    tone: "sky",
    monogram: "Laundry Powder",
    description: "Daily-use washing powder for clothes, bedsheets and towels.",
    features: ["1kg pack", "Fresh fragrance", "Order multiple packs for delivery"],
    imageUrl: "",
    status: "active",
    sortOrder: 30,
    featured: true,
  },
  {
    id: "spin-mop-set",
    name: "Spin Mop Set",
    category: "Cleaning & Laundry",
    unit: "Bucket Set",
    price: 2490,
    oldPrice: 3200,
    stock: 5,
    reviews: "Best seller",
    tone: "violet",
    monogram: "Spin Mop",
    description: "Bucket and spin mop set for quick home cleaning with less effort.",
    features: ["Bucket with spinner", "Reusable mop head", "Good for tiled floors"],
    imageUrl: "",
    status: "active",
    sortOrder: 40,
  },
];

const state = {
  sdk: null,
  db: null,
  storage: null,
  auth: null,
  user: null,
  products: [],
  orders: [],
  reviews: [],
  editingId: null,
  search: "",
  statusFilter: "all",
  orderFilter: "all",
  reviewFilter: "pending",
  unsubscribe: null,
  unsubscribeOrders: null,
  unsubscribeReviews: null,
};

const els = {
  setupAlert: document.querySelector("[data-setup-alert]"),
  authPanel: document.querySelector("[data-auth-panel]"),
  dashboard: document.querySelector("[data-dashboard]"),
  authForm: document.querySelector("[data-auth-form]"),
  authMessage: document.querySelector("[data-auth-message]"),
  adminStatus: document.querySelector("[data-admin-status]"),
  adminUser: document.querySelector("[data-admin-user]"),
  signOut: document.querySelector("[data-sign-out]"),
  productForm: document.querySelector("[data-product-form]"),
  formTitle: document.querySelector("[data-form-title]"),
  formMessage: document.querySelector("[data-form-message]"),
  imagePreview: document.querySelector("[data-image-preview]"),
  productsList: document.querySelector("[data-admin-products]"),
  adminSearch: document.querySelector("[data-admin-search]"),
  statusFilter: document.querySelector("[data-status-filter]"),
  resetForm: document.querySelector("[data-reset-form]"),
  duplicateProduct: document.querySelector("[data-duplicate-product]"),
  newProduct: document.querySelector("[data-new-product]"),
  seedProducts: document.querySelector("[data-seed-products]"),
  exportProducts: document.querySelector("[data-export-products]"),
  categoryOptions: document.querySelector("[data-category-options]"),
  toast: document.querySelector("[data-toast]"),
  stats: {
    total: document.querySelector("[data-stat-total]"),
    active: document.querySelector("[data-stat-active]"),
    low: document.querySelector("[data-stat-low]"),
    featured: document.querySelector("[data-stat-featured]"),
    orders: document.querySelector("[data-stat-orders]"),
    reviews: document.querySelector("[data-stat-reviews]"),
  },
  orderList: document.querySelector("[data-order-list]"),
  stockAlerts: document.querySelector("[data-stock-alerts]"),
  reviewList: document.querySelector("[data-review-list]"),
  orderFilter: document.querySelector("[data-order-filter]"),
  reviewFilter: document.querySelector("[data-review-filter]"),
};

function setStatus(message) {
  els.adminStatus.textContent = message;
}

function setAuthMessage(message) {
  els.authMessage.textContent = message || "";
}

function setFormMessage(message) {
  els.formMessage.textContent = message || "";
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    els.toast.hidden = true;
  }, 3200);
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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function money(value) {
  return `Rs. ${new Intl.NumberFormat("en-LK").format(Number(value) || 0)}`;
}

function discountFrom(product) {
  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  return oldPrice > price && oldPrice > 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
}

function normalizeProduct(id, data) {
  return {
    id,
    name: data.name || "",
    category: data.category || "Home Essentials",
    unit: data.unit || "1 Pc",
    price: Number(data.price) || 0,
    oldPrice: Number(data.oldPrice) || 0,
    discount: Number(data.discount) || discountFrom(data),
    stock: Number(data.stock) || 0,
    reviews: data.reviews || "In stock",
    tone: data.tone || "mint",
    monogram: data.monogram || data.name || "Product",
    description: data.description || "",
    features: Array.isArray(data.features) ? data.features : [],
    imageUrl: data.imageUrl || "",
    status: data.status || "active",
    sortOrder: Number(data.sortOrder) || 9999,
    featured: Boolean(data.featured),
  };
}

function sortedProducts() {
  return [...state.products].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name);
  });
}

function filteredProducts() {
  const query = state.search.toLowerCase().trim();
  return sortedProducts().filter((product) => {
    const statusMatch = state.statusFilter === "all" || product.status === state.statusFilter;
    const searchMatch =
      !query ||
      [product.id, product.name, product.category, product.unit, product.description]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return statusMatch && searchMatch;
  });
}

async function loadFirebase() {
  if (!isFirebaseConfigured()) {
    els.setupAlert.hidden = false;
    setStatus("Firebase config missing");
    setAuthMessage("Paste Firebase config first, then refresh this page.");
    return;
  }

  const [appModule, authModule, firestoreModule, storageModule] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"),
    import("https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js"),
  ]);

  const app = appModule.initializeApp(FIREBASE_CONFIG);
  state.sdk = { authModule, firestoreModule, storageModule };
  state.auth = authModule.getAuth(app);
  state.db = firestoreModule.getFirestore(app);
  state.storage = storageModule.getStorage(app);

  setStatus("Firebase ready");
  authModule.onAuthStateChanged(state.auth, handleAuthState);
}

async function handleAuthState(user) {
  state.user = user;

  if (!user) {
    els.authPanel.hidden = false;
    els.dashboard.hidden = true;
    els.signOut.hidden = true;
    setStatus("Signed out");
    if (state.unsubscribe) state.unsubscribe();
    if (state.unsubscribeOrders) state.unsubscribeOrders();
    if (state.unsubscribeReviews) state.unsubscribeReviews();
    return;
  }

  els.authPanel.hidden = true;
  els.dashboard.hidden = false;
  els.signOut.hidden = false;
  els.adminUser.textContent = `${user.email} | UID: ${user.uid}`;
  setStatus("Signed in");
  listenProducts();
  listenOrders();
  listenReviews();
}

function listenProducts() {
  if (state.unsubscribe) state.unsubscribe();
  const { collection, onSnapshot } = state.sdk.firestoreModule;

  state.unsubscribe = onSnapshot(
    collection(state.db, FIREBASE_COLLECTIONS.products),
    (snapshot) => {
      state.products = snapshot.docs.map((doc) => normalizeProduct(doc.id, doc.data()));
      renderAdmin();
      setStatus("Live products synced");
    },
    (error) => {
      console.error(error);
      setStatus("Firestore access blocked");
      toast("Firestore rules blocked access. Add your UID to admins collection.");
    },
  );
}

function listenOrders() {
  if (state.unsubscribeOrders) state.unsubscribeOrders();
  const { collection, onSnapshot } = state.sdk.firestoreModule;

  state.unsubscribeOrders = onSnapshot(
    collection(state.db, FIREBASE_COLLECTIONS.orders),
    (snapshot) => {
      state.orders = snapshot.docs.map((doc) => normalizeOrder(doc.id, doc.data()));
      renderOperations();
      setStatus("Orders synced");
    },
    (error) => {
      console.error(error);
      toast("Order access blocked. Check Firestore rules.");
    },
  );
}

function listenReviews() {
  if (state.unsubscribeReviews) state.unsubscribeReviews();
  const { collection, onSnapshot } = state.sdk.firestoreModule;

  state.unsubscribeReviews = onSnapshot(
    collection(state.db, FIREBASE_COLLECTIONS.reviews),
    (snapshot) => {
      state.reviews = snapshot.docs.map((doc) => normalizeReview(doc.id, doc.data()));
      renderOperations();
      setStatus("Reviews synced");
    },
    (error) => {
      console.error(error);
      toast("Review access blocked. Check Firestore rules.");
    },
  );
}

function normalizeOrder(id, data) {
  return {
    id,
    status: data.status || "pending",
    customerName: data.customerName || "",
    customerPhone: data.customerPhone || "",
    customerAddress: data.customerAddress || "",
    deliveryArea: data.deliveryArea || "",
    deliveryFee: Number(data.deliveryFee) || 0,
    paymentMethod: data.paymentMethod || "",
    note: data.note || "",
    items: Array.isArray(data.items) ? data.items : [],
    subtotal: Number(data.subtotal) || 0,
    total: Number(data.total) || 0,
    createdAtMs: data.createdAt?.toMillis ? data.createdAt.toMillis() : 0,
  };
}

function normalizeReview(id, data) {
  return {
    id,
    productId: data.productId || "",
    customerName: data.customerName || "",
    rating: Number(data.rating) || 5,
    comment: data.comment || "",
    status: data.status || "pending",
    createdAtMs: data.createdAt?.toMillis ? data.createdAt.toMillis() : 0,
  };
}

function renderStats() {
  const total = state.products.length;
  const active = state.products.filter((product) => product.status === "active").length;
  const low = state.products.filter((product) => product.status === "active" && product.stock <= 2).length;
  const featured = state.products.filter((product) => product.featured).length;
  const pendingOrders = state.orders.filter((order) => order.status === "pending").length;
  const pendingReviews = state.reviews.filter((review) => review.status === "pending").length;

  els.stats.total.textContent = total;
  els.stats.active.textContent = active;
  els.stats.low.textContent = low;
  els.stats.featured.textContent = featured;
  els.stats.orders.textContent = pendingOrders;
  els.stats.reviews.textContent = pendingReviews;
}

function renderCategoryOptions() {
  const categories = [...new Set(state.products.map((product) => product.category).filter(Boolean))].sort();
  els.categoryOptions.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}"></option>`).join("");
}

function renderProductList() {
  const products = filteredProducts();

  if (!products.length) {
    els.productsList.innerHTML = `<div class="empty-state">No products match this filter.</div>`;
    return;
  }

  els.productsList.innerHTML = products
    .map((product) => {
      const thumb = product.imageUrl
        ? `<img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" loading="lazy" />`
        : `<span>${escapeHtml(product.monogram || product.name)}</span>`;
      const statusClass = product.status === "draft" ? "is-draft" : "";

      return `
        <article class="admin-product" data-product-id="${escapeHtml(product.id)}">
          <div class="admin-thumb">${thumb}</div>
          <div>
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.category)} | ${escapeHtml(product.unit)} | ${money(product.price)}</p>
            <div class="product-badges">
              <span class="${statusClass}">${escapeHtml(product.status)}</span>
              <span>${product.stock} in stock</span>
              ${product.featured ? "<span>Featured</span>" : ""}
              ${product.discount ? `<span>-${product.discount}%</span>` : ""}
            </div>
          </div>
          <div class="row-actions">
            <button class="icon-button" type="button" data-edit-product="${escapeHtml(product.id)}">Edit</button>
            <button class="icon-button" type="button" data-draft-product="${escapeHtml(product.id)}">
              ${product.status === "active" ? "Draft" : "Activate"}
            </button>
            <button class="icon-button danger" type="button" data-delete-product="${escapeHtml(product.id)}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function orderDate(order) {
  return order.createdAtMs ? new Date(order.createdAtMs).toLocaleString() : "No date";
}

function statusTemplate(order, status) {
  const itemLines = order.items
    .map((item, index) => `${index + 1}. ${item.name} x ${item.qty || 1}`)
    .join("\n");

  const templates = {
    confirmed: [
      `Hello ${order.customerName}, your order ${order.id} is confirmed.`,
      "",
      itemLines,
      "",
      `Total: ${money(order.total)}`,
      "We will update you before delivery.",
    ],
    delivered: [
      `Hello ${order.customerName}, your order ${order.id} has been marked as delivered.`,
      "Thank you for shopping with Nandage Home Store.",
    ],
    cancelled: [
      `Hello ${order.customerName}, your order ${order.id} has been cancelled.`,
      "Please message us if you need help placing a new order.",
    ],
    pending: [
      `Hello ${order.customerName}, we received your order ${order.id}.`,
      "We are checking stock and delivery fee now.",
    ],
  };

  return templates[status] || templates.pending;
}

function whatsappPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `94${digits.slice(1)}`;
  return digits;
}

function whatsappTemplateUrl(order, status) {
  const phone = whatsappPhone(order.customerPhone);
  const message = statusTemplate(order, status).join("\n");
  return `https://wa.me/${phone || ""}?text=${encodeURIComponent(message)}`;
}

function renderOrders() {
  const orders = [...state.orders]
    .filter((order) => state.orderFilter === "all" || order.status === state.orderFilter)
    .sort((a, b) => b.createdAtMs - a.createdAtMs);

  if (!orders.length) {
    els.orderList.innerHTML = `<div class="empty-state">No orders found.</div>`;
    return;
  }

  els.orderList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card" data-order-id="${escapeHtml(order.id)}">
          <div>
            <span class="status-pill ${escapeHtml(order.status)}">${escapeHtml(order.status)}</span>
            <h3>${escapeHtml(order.id)} - ${escapeHtml(order.customerName)}</h3>
            <p>${escapeHtml(order.customerPhone)} | ${escapeHtml(order.deliveryArea)} | ${escapeHtml(order.paymentMethod)}</p>
            <p>${escapeHtml(order.customerAddress)}</p>
            <div class="order-items">
              ${order.items
                .map((item) => `<span>${escapeHtml(item.name)} x ${item.qty || 1} - ${money(item.lineTotal || item.price || 0)}</span>`)
                .join("")}
            </div>
            <p>${orderDate(order)} | Total ${money(order.total)}</p>
          </div>
          <div class="order-actions">
            <select data-order-status="${escapeHtml(order.id)}" aria-label="Order status">
              ${["pending", "confirmed", "delivered", "cancelled"]
                .map((status) => `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`)
                .join("")}
            </select>
            <div class="template-buttons">
              <a class="icon-button" href="${whatsappTemplateUrl(order, "confirmed")}" target="_blank" rel="noopener">Confirm WA</a>
              <a class="icon-button" href="${whatsappTemplateUrl(order, "delivered")}" target="_blank" rel="noopener">Delivered WA</a>
              <a class="icon-button danger" href="${whatsappTemplateUrl(order, "cancelled")}" target="_blank" rel="noopener">Cancel WA</a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderStockAlerts() {
  const lowStock = sortedProducts().filter((product) => product.status === "active" && product.stock <= 2);

  if (!lowStock.length) {
    els.stockAlerts.innerHTML = `<div class="empty-state">No low-stock products right now.</div>`;
    return;
  }

  els.stockAlerts.innerHTML = lowStock
    .map(
      (product) => `
        <article class="stock-alert-card">
          <div>
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.category)} | ${money(product.price)}</p>
          </div>
          <span class="status-pill pending">${product.stock} left</span>
        </article>
      `,
    )
    .join("");
}

function renderReviews() {
  const reviews = [...state.reviews]
    .filter((review) => state.reviewFilter === "all" || review.status === state.reviewFilter)
    .sort((a, b) => b.createdAtMs - a.createdAtMs);

  if (!reviews.length) {
    els.reviewList.innerHTML = `<div class="empty-state">No reviews found.</div>`;
    return;
  }

  els.reviewList.innerHTML = reviews
    .map((review) => {
      const product = state.products.find((item) => item.id === review.productId);
      return `
        <article class="review-admin-card" data-review-id="${escapeHtml(review.id)}">
          <div>
            <span class="status-pill ${escapeHtml(review.status)}">${escapeHtml(review.status)}</span>
            <h3>${escapeHtml(review.customerName)} - ${review.rating}/5</h3>
            <p>${escapeHtml(product?.name || review.productId)}</p>
            <p>${escapeHtml(review.comment)}</p>
          </div>
          <div class="row-actions">
            <button class="icon-button" type="button" data-review-status="${escapeHtml(review.id)}" data-status="approved">Approve</button>
            <button class="icon-button" type="button" data-review-status="${escapeHtml(review.id)}" data-status="pending">Pending</button>
            <button class="icon-button danger" type="button" data-review-delete="${escapeHtml(review.id)}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOperations() {
  renderStats();
  renderOrders();
  renderStockAlerts();
  renderReviews();
}

function renderAdmin() {
  renderStats();
  renderCategoryOptions();
  renderProductList();
  renderStockAlerts();
  renderReviews();
}

function previewImage(url) {
  els.imagePreview.innerHTML = url
    ? `<img src="${escapeHtml(url)}" alt="Selected product preview" />`
    : "<span>No image</span>";
}

function resetForm() {
  state.editingId = null;
  els.productForm.reset();
  els.productForm.elements.sortOrder.value = "999";
  els.productForm.elements.status.value = "active";
  els.formTitle.textContent = "Add product";
  els.duplicateProduct.disabled = true;
  previewImage("");
  setFormMessage("");
}

function loadProductToForm(product) {
  state.editingId = product.id;
  const form = els.productForm.elements;

  form.name.value = product.name;
  form.id.value = product.id;
  form.category.value = product.category;
  form.unit.value = product.unit;
  form.price.value = product.price;
  form.oldPrice.value = product.oldPrice || "";
  form.stock.value = product.stock;
  form.sortOrder.value = product.sortOrder;
  form.reviews.value = product.reviews;
  form.tone.value = product.tone;
  form.status.value = product.status;
  form.monogram.value = product.monogram;
  form.description.value = product.description;
  form.features.value = product.features.join("\n");
  form.featured.checked = product.featured;
  form.imageUrl.value = product.imageUrl || "";
  form.imageFile.value = "";

  els.formTitle.textContent = "Edit product";
  els.duplicateProduct.disabled = false;
  previewImage(product.imageUrl);
  setFormMessage(`Editing ${product.id}`);
}

function formProduct() {
  const form = els.productForm.elements;
  const name = form.name.value.trim();
  const id = slugify(form.id.value || name);
  const price = Number(form.price.value) || 0;
  const oldPrice = Number(form.oldPrice.value) || 0;
  const stock = Number(form.stock.value) || 0;
  const product = {
    name,
    category: form.category.value.trim(),
    unit: form.unit.value.trim(),
    price,
    oldPrice,
    discount: discountFrom({ price, oldPrice }),
    stock,
    reviews: form.reviews.value.trim() || (stock > 0 ? "In stock" : "Out of stock"),
    tone: form.tone.value,
    status: form.status.value,
    monogram: form.monogram.value.trim() || name,
    description: form.description.value.trim(),
    features: form.features.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    imageUrl: form.imageUrl.value.trim(),
    sortOrder: Number(form.sortOrder.value) || 9999,
    featured: form.featured.checked,
  };

  return { id, product };
}

async function uploadImageIfNeeded(id) {
  const file = els.productForm.elements.imageFile.files[0];
  if (!file) return "";

  const { ref, uploadBytes, getDownloadURL } = state.sdk.storageModule;
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const imageRef = ref(state.storage, `products/${id}/${Date.now()}-${safeName}`);

  setFormMessage("Uploading image...");
  await uploadBytes(imageRef, file, { contentType: file.type });
  return getDownloadURL(imageRef);
}

async function saveProduct(event) {
  event.preventDefault();
  const { doc, setDoc, serverTimestamp } = state.sdk.firestoreModule;
  const { id, product } = formProduct();

  if (!id || !product.name || !product.category || !product.description) {
    setFormMessage("Please fill the required fields.");
    return;
  }

  try {
    const uploadedUrl = await uploadImageIfNeeded(id);
    if (uploadedUrl) product.imageUrl = uploadedUrl;

    const payload = {
      ...product,
      updatedAt: serverTimestamp(),
    };

    if (!state.editingId || state.editingId !== id) {
      payload.createdAt = serverTimestamp();
    }

    await setDoc(doc(state.db, FIREBASE_COLLECTIONS.products, id), payload, { merge: true });

    if (state.editingId && state.editingId !== id) {
      await deleteProductById(state.editingId, false);
    }

    toast("Product saved to Firebase.");
    resetForm();
  } catch (error) {
    console.error(error);
    setFormMessage(error.message);
    toast("Could not save product.");
  }
}

async function deleteProductById(id, showToast = true) {
  const { doc, deleteDoc } = state.sdk.firestoreModule;
  await deleteDoc(doc(state.db, FIREBASE_COLLECTIONS.products, id));
  if (showToast) toast("Product deleted.");
}

async function toggleDraft(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;

  const { doc, setDoc, serverTimestamp } = state.sdk.firestoreModule;
  const nextStatus = product.status === "active" ? "draft" : "active";
  await setDoc(
    doc(state.db, FIREBASE_COLLECTIONS.products, id),
    { status: nextStatus, updatedAt: serverTimestamp() },
    { merge: true },
  );
  toast(`Product set to ${nextStatus}.`);
}

async function updateOrderStatus(id, status) {
  const { doc, setDoc, serverTimestamp } = state.sdk.firestoreModule;
  await setDoc(
    doc(state.db, FIREBASE_COLLECTIONS.orders, id),
    { status, updatedAt: serverTimestamp() },
    { merge: true },
  );
  toast(`Order set to ${status}.`);
}

async function updateReviewStatus(id, status) {
  const { doc, setDoc, serverTimestamp } = state.sdk.firestoreModule;
  await setDoc(
    doc(state.db, FIREBASE_COLLECTIONS.reviews, id),
    { status, updatedAt: serverTimestamp() },
    { merge: true },
  );
  toast(`Review set to ${status}.`);
}

async function deleteReview(id) {
  const { doc, deleteDoc } = state.sdk.firestoreModule;
  await deleteDoc(doc(state.db, FIREBASE_COLLECTIONS.reviews, id));
  toast("Review deleted.");
}

async function seedProducts() {
  const confirmed = window.confirm("This will add demo products to Firebase. Continue?");
  if (!confirmed) return;

  const { writeBatch, doc, serverTimestamp } = state.sdk.firestoreModule;
  const batch = writeBatch(state.db);

  SAMPLE_PRODUCTS.forEach((product) => {
    batch.set(
      doc(state.db, FIREBASE_COLLECTIONS.products, product.id),
      {
        ...product,
        discount: discountFrom(product),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  });

  await batch.commit();
  toast("Demo products seeded.");
}

function exportProducts() {
  const data = JSON.stringify(sortedProducts(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nandage-products.json";
  link.click();
  URL.revokeObjectURL(url);
}

function duplicateCurrent() {
  if (!state.editingId) return;
  const form = els.productForm.elements;
  form.id.value = `${slugify(form.name.value)}-copy`;
  form.name.value = `${form.name.value} Copy`;
  state.editingId = null;
  els.formTitle.textContent = "Duplicate product";
  els.duplicateProduct.disabled = true;
  setFormMessage("Edit details and save as a new product.");
}

function attachEvents() {
  els.authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.sdk) {
      setAuthMessage("Firebase config missing. Update assets/firebase-config.js first.");
      return;
    }
    setAuthMessage("Signing in...");
    const { signInWithEmailAndPassword } = state.sdk.authModule;
    const form = new FormData(els.authForm);

    try {
      await signInWithEmailAndPassword(state.auth, form.get("email"), form.get("password"));
      setAuthMessage("");
    } catch (error) {
      setAuthMessage(error.message);
    }
  });

  els.signOut.addEventListener("click", () => {
    state.sdk.authModule.signOut(state.auth);
  });

  els.productForm.addEventListener("submit", saveProduct);
  els.resetForm.addEventListener("click", resetForm);
  els.newProduct.addEventListener("click", resetForm);
  els.duplicateProduct.addEventListener("click", duplicateCurrent);
  els.seedProducts.addEventListener("click", seedProducts);
  els.exportProducts.addEventListener("click", exportProducts);

  els.adminSearch.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProductList();
  });

  els.statusFilter.addEventListener("change", (event) => {
    state.statusFilter = event.target.value;
    renderProductList();
  });

  els.orderFilter.addEventListener("change", (event) => {
    state.orderFilter = event.target.value;
    renderOrders();
  });

  els.reviewFilter.addEventListener("change", (event) => {
    state.reviewFilter = event.target.value;
    renderReviews();
  });

  els.productForm.elements.imageFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) previewImage(URL.createObjectURL(file));
  });

  els.productForm.elements.imageUrl.addEventListener("input", (event) => {
    previewImage(event.target.value.trim());
  });

  els.productsList.addEventListener("click", async (event) => {
    const edit = event.target.closest("[data-edit-product]");
    const draft = event.target.closest("[data-draft-product]");
    const remove = event.target.closest("[data-delete-product]");

    if (edit) {
      const product = state.products.find((item) => item.id === edit.dataset.editProduct);
      if (product) loadProductToForm(product);
    }

    if (draft) {
      await toggleDraft(draft.dataset.draftProduct);
    }

    if (remove) {
      const confirmed = window.confirm("Delete this product permanently?");
      if (confirmed) await deleteProductById(remove.dataset.deleteProduct);
    }
  });

  els.orderList.addEventListener("change", async (event) => {
    const statusSelect = event.target.closest("[data-order-status]");
    if (!statusSelect) return;
    await updateOrderStatus(statusSelect.dataset.orderStatus, statusSelect.value);
  });

  els.reviewList.addEventListener("click", async (event) => {
    const statusButton = event.target.closest("[data-review-status]");
    const deleteButton = event.target.closest("[data-review-delete]");

    if (statusButton) {
      await updateReviewStatus(statusButton.dataset.reviewStatus, statusButton.dataset.status);
    }

    if (deleteButton) {
      const confirmed = window.confirm("Delete this review permanently?");
      if (confirmed) await deleteReview(deleteButton.dataset.reviewDelete);
    }
  });
}

async function init() {
  attachEvents();
  resetForm();

  try {
    await loadFirebase();
  } catch (error) {
    console.error(error);
    els.setupAlert.hidden = false;
    setStatus("Firebase failed to load");
    setAuthMessage(error.message);
  }
}

window.addEventListener("beforeunload", () => {
  if (state.unsubscribe) state.unsubscribe();
  if (state.unsubscribeOrders) state.unsubscribeOrders();
  if (state.unsubscribeReviews) state.unsubscribeReviews();
});

init();
