# E-Commerce Web App Project

A React, TypeScript, Firebase, and Firestore e-commerce web app. Users can register, log in, browse products, filter by category, add products to a cart, checkout, view order history, manage their profile, and create, edit, delete, or import products into Firestore.

This project was built to practice React component structure, TypeScript types, Firebase Authentication, Firestore database operations, Redux Toolkit state management, React Query data fetching, routing, and responsive styling.

---

## Features

### Authentication

- Register new users with Firebase Authentication
- Log in existing users
- Create a matching Firestore user profile during registration

### User Profile

- View user profile information
- Edit display name and address
- Save profile updates to Firestore
- Delete the user profile and Firebase authentication account

### Product Management

- Read products from the Firestore `products` collection
- Filter products by category
- Display product title, image, description, category, price, and rating
- Add products to the shopping cart
- Create new products manually
- Edit existing products
- Delete products from Firestore
- Import starter products from the FakeStore API into Firestore
- Use fallback image handling when product images fail to load

### Shopping Cart

- Add products to the cart
- Increase product quantity
- Decrease product quantity
- Remove items from the cart
- View item subtotals
- View total cart price
- View total cart item count
- Persist cart data with `sessionStorage`
- Clear the cart after checkout

### Orders

- Save completed checkouts to the Firestore `orders` collection
- Store user ID, user email, ordered items, total price, total item count, and created date
- View order history for the signed-in user
- Expand an order to view order details

### UI and Navigation

- Client-side routing with React Router
- Navbar links for Home, Create Product, Order History, Profile, and Cart
- Cart icon badge showing the total number of cart items
- Product pagination on the Home page
- Responsive layout for desktop and smaller screens
- Bootstrap and custom CSS styling

---

## Technologies Used

| Technology | Purpose |
| --- | --- |
| React | Builds the user interface with reusable components |
| TypeScript | Adds type safety for products, cart items, users, and orders |
| Vite | Provides the development server and production build tooling |
| Firebase Authentication | Handles user registration, login, logout, and account deletion |
| Cloud Firestore | Stores products, user profiles, and orders |
| React Query | Fetches and refreshes product/category data |
| Redux Toolkit | Manages shopping cart state |
| React Redux | Connects Redux state and actions to React components |
| React Router | Handles page routing/navigation |
| Bootstrap | Provides reusable button, form, grid, and utility styling |
| CSS | Adds custom layout, product card, cart, navbar, and responsive styles |
| sessionStorage | Keeps the shopping cart available after a page refresh |
| FakeStore API | Provides sample product data for importing into Firestore |

---

## Firebase / Firestore Collections

| Collection | Purpose | Example Fields |
| --- | --- | --- |
| `products` | Stores products shown in the shop | `title`, `price`, `description`, `category`, `image`, `rating` |
| `users` | Stores extra user profile information | `uid`, `email`, `displayName`, `address`, `createdAt` |
| `orders` | Stores completed checkout orders | `userId`, `userEmail`, `items`, `totalPrice`, `totalItems`, `createdAt` |

---

## App Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Displays products, category filter, pagination, add-to-cart, and edit product UI |
| `/create-product` | Create Product | Allows manual product creation and FakeStore product import |
| `/cart` | Cart | Displays cart items, quantity controls, totals, and checkout |
| `/order-history` | Order History | Shows previous orders for the signed-in user |
| `/profile` | Profile | Shows and edits user profile information |

---

## Project Structure

```txt
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
├── components/
│   ├── Login.tsx
│   ├── NavBar.tsx
│   ├── OrderHistory.tsx
│   ├── ProductForm.tsx
│   ├── Profile.tsx
│   ├── Register.tsx
│   └── ShoppingCart.tsx
├── features/
│   └── cart/
│       └── cartSlice.ts
├── pages/
│   ├── CartPage.tsx
│   ├── CreateProductPage.tsx
│   ├── Home.tsx
│   ├── OrderHistoryPage.tsx
│   └── ProfilePage.tsx
├── services/
│   ├── authServices.ts
│   ├── orderServices.ts
│   ├── productServices.ts
│   └── userService.ts
├── types/
│   ├── order.ts
│   ├── product.ts
│   └── userProfile.ts
├── App.tsx
├── firebaseConfig.ts
├── index.css
└── main.tsx
```

---

## Important Files

| File | Description |
| --- | --- |
| `src/App.tsx` | Sets up app layout, authentication state, protected pages, and routes |
| `src/firebaseConfig.ts` | Initializes Firebase Authentication and Firestore using environment variables |
| `src/pages/Home.tsx` | Displays products, filtering, pagination, add-to-cart, edit, and delete product features |
| `src/components/ProductForm.tsx` | Creates new products and imports FakeStore products into Firestore |
| `src/components/ShoppingCart.tsx` | Displays cart items, quantity controls, totals, checkout, and order creation |
| `src/components/OrderHistory.tsx` | Loads and displays the signed-in user's past orders |
| `src/components/Profile.tsx` | Displays, edits, and deletes user profile/account information |
| `src/components/NavBar.tsx` | Displays navigation links, cart badge, signed-in email, and logout button |
| `src/features/cart/cartSlice.ts` | Contains Redux Toolkit cart reducers and actions |
| `src/services/productServices.ts` | Handles Firestore product CRUD and FakeStore importing |
| `src/services/orderServices.ts` | Handles Firestore order creation and order history queries |
| `src/services/userService.ts` | Handles Firestore user profile CRUD |
| `src/services/authServices.ts` | Handles logout and Firebase auth account deletion |

---

## Environment Variables

Create a `.env` file in the project root and add your Firebase configuration values.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Do not commit your `.env` file to GitHub.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/JoeM10/E-Commerce-Web-App-Project.git
```

Navigate into the project folder:

```bash
cd E-Commerce-Web-App-Project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```txt
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the project for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |
| `npm run test` | Runs Jest tests |

---

## How Product Import Works

The Create Product page includes an **Import FakeStore Products** button.

When clicked, the app:

1. Fetches product data from the FakeStore API.
2. Loops through each returned product.
3. Saves each product into the Firestore `products` collection.
4. Uses the FakeStore product ID as the Firestore document ID.

Using the FakeStore product ID helps prevent duplicate imports if the button is clicked more than once.

---

## Cart and Checkout Flow

The cart uses Redux Toolkit for state management.

When a user adds an item to the cart:

- If the item is not already in the cart, it is added with a quantity of `1`.
- If the item is already in the cart, its quantity increases.

The cart is saved to `sessionStorage` so it remains available after a page refresh.

During checkout:

1. The app checks that a user is logged in.
2. The order is saved to Firestore.
3. The cart is cleared from Redux state.
4. The cart is removed from `sessionStorage`.
5. A checkout success message is displayed.

---

## TypeScript Types

### Product

```ts
export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
```

### Cart Item

```ts
export type CartItem = Product & {
  count: number;
};
```

### Order

```ts
export interface Order {
  id: string;
  userId: string;
  userEmail: string | null;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: Timestamp | null;
}
```

### User Profile

```ts
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  address: string;
  createdAt: unknown;
}
```

---

## Author

Created by Joseph McDaniel

GitHub: [JoeM10](https://github.com/JoeM10)
