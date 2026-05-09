export const FIREBASE_CONFIG = {
  apiKey: "PASTE_FIREBASE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
};

export const FIREBASE_COLLECTIONS = {
  products: "products",
  orders: "orders",
  reviews: "reviews",
};

export function isFirebaseConfigured() {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
      FIREBASE_CONFIG.projectId &&
      !FIREBASE_CONFIG.apiKey.startsWith("PASTE_") &&
      !FIREBASE_CONFIG.projectId.startsWith("PASTE_"),
  );
}
