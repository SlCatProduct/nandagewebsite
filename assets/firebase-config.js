export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAx1i--9A63vQUum0B_q50nEkRkwaSq8Zw",
  authDomain: "realtime-database-61159.firebaseapp.com",
  databaseURL: "https://realtime-database-61159-default-rtdb.firebaseio.com",
  projectId: "realtime-database-61159",
  storageBucket: "realtime-database-61159.firebasestorage.app",
  messagingSenderId: "994425521828",
  appId: "1:994425521828:web:32b7c7dc9975393deac831",
  measurementId: "G-LCD30QH2GR",
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
