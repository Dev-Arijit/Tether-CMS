# Tether CMS 🌐

**Tether CMS** is a modern, beautifully crafted full-stack Contact Management System designed to help you stay tied to your personal and professional network. It provides a robust, seamless experience for organizing leads, associates, and family contacts with insightful dashboard analytics.

---

## ✨ Features

* **Secure Authentication:** Robust user registration and login flows utilizing JWT (JSON Web Tokens) and bcrypt password hashing.
* **Network Management Dashboard:** A centralized analytics hub featuring visual charts (via Recharts), tracking contact growth, tag grouping, and recent activities.
* **Full CRUD Functionality:** Easily create, read, update, and delete contacts.
* **Smart Contact Handling:** 
  * Avoid duplicates automatically with intelligent creation validations.
  * Upload and store contact profile images seamlessly.
  * Tag-based grouping (e.g., *Work, Family, Friend, Emergency, Other*).
* **Responsive Modern UI:** An aesthetically pleasing, mobile-friendly interface built with Tailwind CSS and React.

## 🛠️ Tech Stack

**Frontend**
* React 19
* Vite (Build Tool) 
* Tailwind CSS v4
* React Router DOM v7
* Recharts (For data visualization)
* Lucide React (For crisp, modern icons)

**Backend**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Token (JWT) for stateless authentication
* Bcryptjs for cryptographic hashing
* CORS & Dotenv

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Dev-Arijit/Tether-CMS.git
   cd Tether-CMS
   ```

2. **Setup the Backend Server**
   ```sh
   cd server
   npm install
   ```
   *Create a `.env` file in the `server` directory and add your environment variables:*
   ```env
   MONGO_URI=mongodb://localhost:27017/contact-management
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```
   *Run the database seed script to populate sample accounts and contacts (optional):*
   ```sh
   node seed.js
   ```
   *Start the development server:*
   ```sh
   npm run dev
   ```

3. **Setup the Frontend Client**
   Open a new terminal window/tab:
   ```sh
   cd client
   npm install
   ```
   *Create a `.env` file in the `client` directory:*
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   *Start the frontend application:*
   ```sh
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to explore your new Contact Management System!

---

## 📂 Folder Structure

```
Tether-CMS/
│
├── client/                 # React Frontend (Vite)
│   ├── public/             # Vite static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context API (Auth, Toast)
│   │   ├── layouts/        # Layout wrappers (Sidebar, etc.)
│   │   ├── pages/          # Full page views (Dashboard, Add Contact)
│   │   └── App.jsx         # Main React Router setup
│   └── package.json        
│
└── server/                 # Express Backend API
    ├── config/             # Database connection setups
    ├── controller/         # Request handling logic (Auth, Contacts)
    ├── middleware/         # Custom authentication protection
    ├── models/             # Mongoose schemas
    ├── routes/             # API routing
    ├── server.js           # Server entry point
    └── package.json        
```

---

## 🛡️ API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user account.
- `POST /api/auth/login`: Login to receive your JWT access token.

### User & Contacts (Protected)
- `GET /api/auth/user/profile`: Retrieve the logged-in user profile.
- `GET /api/auth/dashboard`: Fetch analytics and recent contacts for the main dashboard.
- `POST /api/auth/contact/add`: Create a new contact.
- `GET /api/auth/contacts`: Retrieve contacts with pagination, search, and sorting.
- `PUT /api/auth/contact/update/:id`: Edit database fields of a specific contact.
- `DELETE /api/auth/contact/delete/:id`: Remove a particular contact.

---

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License.
