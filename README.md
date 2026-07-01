# E-Commerce Web App Project

A React and TypeScript e-commerce web application that uses the FakeStoreAPI to display products, filter products by category, and manage a shopping cart with Redux Toolkit.

This project was built as an assignment to practice asynchronous API data fetching, Redux Toolkit state management, TypeScript types, React Query, and browser `sessionStorage`.

---

## Features

* Fetches product data from FakeStoreAPI
* Displays product title, price, category, description, rating, and image
* Uses React Query for asynchronous product and category fetching
* Dynamically loads product categories from the API
* Allows users to filter products by category
* Provides fallback images if a product image fails to load
* Allows users to add products to a shopping cart
* Uses Redux Toolkit to manage cart state
* Allows users to increase and decrease item quantity
* Allows users to remove products from the cart
* Displays total cart item count
* Calculates and displays total cart price
* Saves cart data to `sessionStorage`
* Restores cart data after page refresh
* Simulates checkout by clearing the cart and `sessionStorage`
* Displays checkout success feedback
* Uses Bootstrap and custom CSS for styling

---

## Technologies Used

| Technology     | Purpose                                                   |
| -------------- | --------------------------------------------------------- |
| React          | Frontend user interface                                   |
| TypeScript     | Type safety for products, cart items, and component logic |
| Vite           | Development server and build tool                         |
| React Query    | API data fetching and loading/error state handling        |
| Redux Toolkit  | Shopping cart state management                            |
| React Redux    | Connecting Redux state to React components                |
| Bootstrap      | Button and layout styling                                 |
| CSS            | Custom page and cart styling                              |
| sessionStorage | Temporary cart persistence across page refreshes          |
| FakeStoreAPI   | Mock e-commerce product and category data                 |

---

## API Endpoints Used

The project uses the FakeStoreAPI for product and category data.

```txt
GET /products
```

Fetches all products.

```txt
GET /products/categories
```

Fetches all available product categories.

```txt
GET /products/category/{category}
```

Fetches products from a selected category.

---

## Project Structure

```txt
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
├── components/
│   └── ShoppingCart.tsx
├── features/
│   └── cart/
│       └── cartSlice.ts
├── pages/
│   └── Home.tsx
├── services/
│   └── fakeStoreApi.ts
├── types/
│   └── product.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Important Files

| File                              | Description                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/pages/Home.tsx`              | Displays products, category dropdown, loading/error states, image fallback, and Add to Cart buttons   |
| `src/components/ShoppingCart.tsx` | Displays cart items, quantity controls, remove buttons, totals, checkout button, and checkout message |
| `src/features/cart/cartSlice.ts`  | Contains Redux Toolkit cart reducers and actions                                                      |
| `src/app/store.ts`                | Configures the Redux store                                                                            |
| `src/app/hooks.ts`                | Provides typed Redux hooks for TypeScript                                                             |
| `src/services/fakeStoreApi.ts`    | Contains reusable API fetch functions                                                                 |
| `src/types/product.ts`            | Defines the `Product` and `CartItem` TypeScript types                                                 |

---

## Cart Functionality

The cart is managed with Redux Toolkit.

Users can:

* Add a product to the cart
* Increase product quantity
* Decrease product quantity
* Remove a product completely
* View product subtotal
* View total item count
* View total cart price
* Checkout and clear the cart

If the same product is added more than once, the cart increases the product quantity instead of adding a duplicate cart item.

---

## Session Storage

The shopping cart is saved to `sessionStorage` so the cart can persist after a page refresh.

When the cart changes:

* If the cart has items, the cart is saved to `sessionStorage`
* If the cart is empty, the cart is removed from `sessionStorage`

During checkout:

* Redux cart state is cleared
* `sessionStorage` cart data is removed
* A checkout success message is displayed

---

## TypeScript Types

The app uses TypeScript to define the shape of product and cart data.

```ts
export type Product = {
  id: number;
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

The cart item type extends the product type and adds a quantity count.

```ts
export type CartItem = Product & {
  count: number;
};
```

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

---

## Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the Vite development server    |
| `npm run build`   | Builds the project for production     |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint                           |

---

## Author

Created by Joseph McDaniel
Github: https://github.com/JoeM10/