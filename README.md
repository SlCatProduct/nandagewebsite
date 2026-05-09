# Nandage Home Store

Static storefront with a Firebase-backed admin panel.

## Files

- `index.html` - public one-page store
- `admin.html` - Firebase admin panel
- `assets/app.js` - public catalog rendering and WhatsApp order links
- `assets/admin.js` - Firebase Auth, Firestore product CRUD and Storage image uploads
- `assets/firebase-config.js` - paste your Firebase web app config here
- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules

## Firebase setup

1. Create a Firebase project and add a Web app.
2. Enable Authentication -> Sign-in method -> Email/Password.
3. Create one admin user in Firebase Authentication.
4. Enable Firestore Database.
5. Enable Storage.
6. Paste the web app config into `assets/firebase-config.js`.
7. Publish `firestore.rules` in Firestore Rules.
8. Publish `storage.rules` in Storage Rules.
9. In Firestore, create this document manually:

```text
admins/{YOUR_ADMIN_UID}
```

Add any field, for example:

```json
{
  "role": "owner"
}
```

The admin UID is shown in Firebase Authentication after you create the admin user.

## Admin panel

Open:

```text
http://127.0.0.1:4173/admin.html
```

The public store can:

- Add products to a local cart
- Bulk checkout multiple products through one WhatsApp message
- Use a customer order form with name, phone, address, area and payment method
- Calculate delivery fees by selected area
- Save orders to Firestore when Firebase is configured
- Submit customer reviews for admin approval

The admin can:

- Add products with an uploaded image
- Save product metadata to Firestore
- Upload images to Firebase Storage
- Edit, draft, activate and delete products
- Mark products as featured
- Manage stock, prices, discounts, categories and sort order
- See low-stock alerts
- Manage orders by status: pending, confirmed, delivered, cancelled
- Open WhatsApp status templates for customer updates
- Approve, pending or delete customer reviews
- Seed demo products
- Export products as JSON

## Firestore collections

- `products` - public active products and admin-managed drafts
- `orders` - customer checkout records
- `reviews` - pending and approved product reviews
- `admins` - admin UID allowlist

## Local preview

Run from this folder:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4173/
```

## Store settings

- WhatsApp number: `assets/app.js`, `STORE.whatsappNumber`
- Store name: `assets/app.js`, `STORE.name`
- Delivery note: `assets/app.js`, `STORE.deliveryNote`

Use the WhatsApp number in international format without `+`, spaces or dashes.
