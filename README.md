# E-Commerce Web App Project

[![CI/CD Pipeline](https://github.com/JoeM10/E-Commerce-Web-App-Project/actions/workflows/main.yml/badge.svg)](https://github.com/JoeM10/E-Commerce-Web-App-Project/actions/workflows/main.yml)

A full-stack e-commerce web application built with React, TypeScript, Firebase Authentication, Cloud Firestore, Redux Toolkit, React Query, Jest, and React Testing Library.

Users can register, log in, browse and filter products, manage a shopping cart, complete checkout, view order history, update their profile, and manage products stored in Firestore. The project also includes automated unit and integration tests plus a GitHub Actions Continuous Integration and Continuous Deployment (CI/CD) pipeline that deploys successful builds to Vercel.

---

## Features

### Authentication

- Register users with Firebase Authentication
- Log in and log out with email and password
- Create a matching Firestore user profile during registration
- Track authentication state throughout the application
- Delete the Firestore profile and Firebase Authentication account

### Product Management

- Load products from the Firestore `products` collection
- Filter products by category
- Paginate the product list
- Display product images, descriptions, prices, categories, and ratings
- Create products manually
- Edit existing products
- Delete products from Firestore
- Import starter products from the FakeStore API
- Replace unavailable product images with a fallback image

### Shopping Cart

- Add products to the cart
- Increase and decrease item quantities
- Remove products from the cart
- Display item subtotals, total price, and total item count
- Display the cart quantity in the navigation bar
- Persist cart state with `sessionStorage`
- Clear the cart after a successful checkout

### Orders

- Require authentication before checkout
- Save completed orders to Firestore
- Store the user, ordered items, total price, item count, and creation time
- Load the signed-in user's previous orders
- Expand an order to view its product details

### User Profile

- View the signed-in user's profile
- Edit the display name and address
- Save profile updates to Firestore
- Delete the user's profile and authentication account

### User Interface

- Client-side routing with React Router
- Responsive layouts using Bootstrap and custom CSS
- Navigation links for products, product creation, cart, order history, and profile
- Loading, error, empty-cart, and checkout feedback messages

---

## Automated Testing

The project uses Jest, React Testing Library, Jest DOM, Babel, and the JSDOM browser environment.

| Test File | Test Type | Coverage |
| --- | --- | --- |
| `src/__tests__/ProductForm.test.tsx` | Unit | Confirms that the product form renders and that the title input updates when a user types |
| `src/__tests__/NavBar.test.tsx` | Unit | Confirms that navigation links render and that clicking Logout calls the supplied logout handler |
| `src/__tests__/CartIntegration.test.tsx` | Integration | Renders the Home and Shopping Cart components with one Redux store, adds a product, and confirms the cart updates |

Current test coverage for the assignment:

```txt
Test Suites: 3 passed
Tests:       5 passed
```

Run all tests:

```bash
npm test
```

Run the same command used by GitHub Actions:

```bash
npm test -- --runInBand --ci
```

`--runInBand` runs tests sequentially in one process, while `--ci` configures Jest for a Continuous Integration environment.

---

## Continuous Integration and Deployment

The primary combined workflow is located at:

```txt
.github/workflows/main.yml
```

It runs automatically whenever code is pushed to the `main` branch.

### Pipeline Flow

| Stage | Action |
| --- | --- |
| Checkout | Downloads the repository onto the GitHub Actions runner |
| Node setup | Installs Node.js 24 and enables the npm cache |
| Install | Runs `npm ci` using the locked dependency versions |
| Test | Runs all Jest tests with `npm test -- --runInBand --ci` |
| Build | Creates the production Vite build with `npm run build` |
| Vercel settings | Pulls the Vercel production project configuration |
| Vercel build | Builds the production deployment artifacts |
| Deploy | Deploys the prebuilt application to Vercel |

The deployment job includes:

```yaml
needs: build-and-test
```

This prevents deployment when dependency installation, testing, or the production build fails.

### Required GitHub Actions Secrets

Add these under:

```txt
Repository Settings → Secrets and variables → Actions
```

| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Authenticates the Vercel Command-Line Interface during deployment |
| `VERCEL_ORG_ID` | Identifies the Vercel account or team |
| `VERCEL_PROJECT_ID` | Identifies the linked Vercel project |

Never place the Vercel token directly in the workflow or source code.

---

## Technologies Used

| Technology | Purpose |
| --- | --- |
| React 19 | Builds the component-based user interface |
| TypeScript | Adds type safety for application data and component logic |
| Vite | Runs the development server and creates production builds |
| Firebase Authentication | Handles registration, login, logout, and account deletion |
| Cloud Firestore | Stores products, user profiles, and orders |
| Redux Toolkit | Manages shopping-cart state |
| React Redux | Connects React components to the Redux store |
| TanStack React Query | Loads, caches, and refreshes product data |
| React Router | Provides client-side routing |
| Bootstrap | Supplies responsive layout and reusable interface styles |
| Custom CSS | Provides application-specific visual styling |
| Jest | Runs unit and integration tests |
| React Testing Library | Tests components through user-facing behavior |
| Jest DOM | Adds browser-focused Jest assertions |
| Babel | Transforms TypeScript, TSX, React, and modern JavaScript for Jest |
| GitHub Actions | Automates installation, testing, building, and deployment |
| Vercel | Hosts the production application |
| FakeStore API | Supplies starter product data for Firestore imports |
| `sessionStorage` | Preserves the cart during the current browser session |

---

## Firebase and Firestore Data

### Collections

| Collection | Purpose | Example Fields |
| --- | --- | --- |
| `products` | Products displayed in the store | `title`, `price`, `description`, `category`, `image`, `rating` |
| `users` | Additional profile information for registered users | `uid`, `email`, `displayName`, `address`, `createdAt` |
| `orders` | Completed checkout records | `userId`, `userEmail`, `items`, `totalPrice`, `totalItems`, `createdAt` |

### Firebase Services to Enable

Before running the project with your own Firebase project:

1. Create a Firebase web application.
2. Enable Email/Password authentication.
3. Create a Cloud Firestore database.
4. Configure Firestore Security Rules for the access your application requires.
5. Add the Firebase web configuration values to the environment variables described below.

---

## Application Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Displays products, category filtering, pagination, editing, deletion, and add-to-cart controls |
| `/create-product` | Create Product | Creates a product manually or imports products from the FakeStore API |
| `/cart` | Shopping Cart | Displays cart items, quantity controls, totals, and checkout |
| `/order-history` | Order History | Displays the signed-in user's previous orders |
| `/profile` | Profile | Displays and edits the signed-in user's profile |

The profile and order-history routes display a login message when no user is authenticated.

---

## Project Structure

```txt
E-Commerce-Web-App-Project/
├── .github/
│   └── workflows/
│       └── main.yml
├── public/
├── src/
│   ├── __tests__/
│   │   ├── CartIntegration.test.tsx
│   │   ├── NavBar.test.tsx
│   │   └── ProductForm.test.tsx
│   ├── app/
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── NavBar.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── ProductForm.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   └── ShoppingCart.tsx
│   ├── features/
│   │   └── cart/
│   │       └── cartSlice.ts
│   ├── pages/
│   │   ├── CartPage.tsx
│   │   ├── CreateProductPage.tsx
│   │   ├── Home.tsx
│   │   ├── OrderHistoryPage.tsx
│   │   └── ProfilePage.tsx
│   ├── services/
│   │   ├── authServices.ts
│   │   ├── fakeStoreApi.ts
│   │   ├── orderServices.ts
│   │   ├── productServices.ts
│   │   └── userService.ts
│   ├── types/
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── userProfile.ts
│   ├── App.tsx
│   ├── firebaseConfig.ts
│   ├── index.css
│   └── main.tsx
├── babel.config.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Important Files

| File | Description |
| --- | --- |
| `src/App.tsx` | Tracks authentication state and defines the application routes |
| `src/firebaseConfig.ts` | Initializes Firebase Authentication and Firestore from Vite environment variables |
| `src/pages/Home.tsx` | Loads products and handles filtering, pagination, editing, deletion, and cart actions |
| `src/components/ProductForm.tsx` | Creates products and imports FakeStore products |
| `src/components/ShoppingCart.tsx` | Manages quantities, totals, checkout, and session persistence |
| `src/components/OrderHistory.tsx` | Loads and displays the user's Firestore orders |
| `src/components/Profile.tsx` | Loads, edits, and deletes the user's profile |
| `src/features/cart/cartSlice.ts` | Defines cart state, actions, and reducers |
| `src/services/productServices.ts` | Provides Firestore product create, read, update, delete, and import operations |
| `src/services/orderServices.ts` | Creates orders and retrieves orders belonging to a user |
| `src/services/userService.ts` | Creates, loads, updates, and deletes Firestore user profiles |
| `babel.config.json` | Configures Babel for Jest, React, and TypeScript |
| `.github/workflows/main.yml` | Defines the combined CI/CD pipeline |

---

## Getting Started

### Prerequisites

- Node.js 24.x recommended
- npm
- A Firebase project
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/JoeM10/E-Commerce-Web-App-Project.git
cd E-Commerce-Web-App-Project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Local Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

The `.env` file is ignored by Git and must not be committed.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local address printed by Vite, normally:

```txt
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist` |
| `npm run preview` | Serves the production build locally for review |
| `npm run lint` | Runs the project's ESLint configuration |
| `npm test` | Runs all Jest tests |
| `npm test -- --runInBand --ci` | Runs the tests using the GitHub Actions configuration |

---

## Vercel Environment Variables

Add the following variables to the Vercel project for the **Production** environment. Preview can also be selected when preview deployments should connect to Firebase.

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

This repository builds the Vercel deployment inside GitHub Actions by running `vercel pull` followed by `vercel build`. For this workflow, the `VITE_FIREBASE_*` values must be downloadable during the build and therefore must not be configured as Vercel **Sensitive** variables. If they are marked Sensitive, `vercel pull` provides empty values and Firebase initialization fails in the deployed browser application.

The Firebase web configuration is included in the client bundle by Vite. Do not use `VITE_*` variables for private server credentials. Protect Firestore data with appropriate Firebase Authentication checks and Firestore Security Rules.

After changing a build-time environment variable, run a new deployment so Vite can include the updated value in the production bundle.

---

## Product Import Flow

The Create Product page includes an **Import FakeStore Products** action.

When selected, the application:

1. Requests products from the FakeStore API.
2. Converts each product ID to a string.
3. Writes each product to the Firestore `products` collection.
4. Uses the FakeStore product ID as the Firestore document ID.

Using a stable document ID prevents the import process from creating a new duplicate document each time it runs.

---

## Cart and Checkout Flow

When a product is added:

1. Redux checks whether that product already exists in the cart.
2. A new product receives a quantity of `1`.
3. An existing product has its quantity increased.
4. The updated cart is stored in `sessionStorage`.

During checkout:

1. The app confirms that a Firebase user is signed in.
2. The order is written to the Firestore `orders` collection.
3. Redux clears the cart.
4. The cart is removed from `sessionStorage`.
5. The user receives a successful checkout message.

---

## Security Notes

- Never commit `.env`, `.vercel`, Vercel tokens, or service-account credentials.
- Firebase web API keys are client configuration values, not authorization rules.
- Use Firebase Authentication and Firestore Security Rules to control database access.
- Keep `VERCEL_TOKEN` stored only as a GitHub Actions secret.
- Review production Firestore rules before using the project with real customer information.

---

## Author

Created by **Joseph McDaniel**

GitHub: [JoeM10](https://github.com/JoeM10)
