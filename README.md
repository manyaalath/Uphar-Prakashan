# Publishing Website - पुस्तक भंडार

A full-stack modern publishing website with Hindi and English language support, featuring both client and admin interfaces.

## ✨ Features

### Client Features
- 📚 Browse and search books (Hindi & English)
- 🔍 Advanced filtering (category, language, price range)
- 🛒 Shopping cart with persistent storage
- 👤 User authentication (signup/login)
- 🌍 Multi-language support (Hindi/English toggle)
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ♿ Accessible UI for all users including Hindi-medium students
- 💳 Checkout and order placement

### Admin Features
- 🔐 Secure admin authentication
- ➕ Add new books with bilingual content
- ✏️ Edit existing books
- 🗑️ Delete books
- 📊 Inventory management dashboard
- 🔎 Search and filter books

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - Server framework
- **SQLite** (better-sqlite3) - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
publishing-website/
├── backend/
│   ├── server.js           # Express server
│   ├── db.js              # Database connection
│   ├── seed.js            # Database seeding script
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication & validation
│   └── migrations/        # Database schema
└── frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── store/         # Zustand stores
    │   ├── i18n/          # Translations
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    └── public/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd publishing-website
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### Database Setup

1. **Run migrations and seed data:**
```bash
cd backend
npm run seed
```

This will create the database with sample data including:
- 1 admin account
- 2 sample client accounts
- 15+ sample books in various categories

### Running the Application

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
Backend will run on **http://localhost:5000**

2. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```
Frontend will run on **http://localhost:5173**

3. **Open your browser and visit:**
```
http://localhost:5173
```

## 🔑 Default Credentials

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Login URL:** http://localhost:5173/admin/login

### Sample Client Account
- **Email:** `raj@example.com`
- **Password:** `password123`
- **Login URL:** http://localhost:5173/login

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Public Endpoints

#### Books
- `GET /books` - Get all books (with filters)
  - Query params: `search`, `category`, `language`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`
- `GET /books/:id` - Get single book by ID
- `GET /books/categories` - Get all categories

#### Client Authentication
- `POST /client/signup` - Register new client
- `POST /client/login` - Client login

### Protected Endpoints

#### Admin (requires admin JWT token)
- `POST /admin/login` - Admin login
- `GET /admin/books` - Get all books (admin view)
- `POST /admin/books` - Create new book
- `PUT /admin/books/:id` - Update book
- `DELETE /admin/books/:id` - Delete book

#### Client (requires client JWT token)
- `POST /client/order` - Create order
- `GET /client/orders` - Get order history

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🌍 Language & Theme

### Switching Language
Click the language toggle button in the header:
- **हिन्दी** for Hindi
- **English** for English

The language preference is saved in localStorage and persists across sessions.

### Switching Theme
Click the theme toggle button (🌞/🌙) in the header to switch between light and dark modes.

## 🛒 Using the Application

### As a Client
1. Browse books on the home page
2. Use filters and search to find books
3. Click on a book to view details
4. Add books to cart
5. View cart and adjust quantities
6. Sign up or login
7. Proceed to checkout
8. Place order

### As an Admin
1. Navigate to `/admin/login`
2. Login with admin credentials
3. View all books in dashboard
4. Add new books with Hindi/English titles and descriptions
5. Edit existing books
6. Delete books
7. Search and filter inventory

## 🎨 Accessibility Features

- Large, readable fonts optimized for Hindi text (Noto Sans Devanagari)
- High contrast colors in both light and dark modes
- Keyboard navigation support
- ARIA labels for screen readers
- Simple, clean interface suitable for village users and students
- One-column layout on mobile devices

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

The build output will be in `frontend/dist/`.

## 🔧 Environment Variables

Create a `.env` file in the backend directory (optional):

```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## 🤝 Contributing

This is a complete demo project. Feel free to customize and extend it for your needs.

## 📝 License

ISC

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use, you can change them:
- Backend: Modify `PORT` in `backend/server.js` or set via environment variable
- Frontend: Modify `server.port` in `frontend/vite.config.js`

### Database Issues
If you encounter database issues, delete `backend/database.db` and run `npm run seed` again.

### CORS Issues
The frontend is configured to proxy API requests to the backend. If you change ports, update the proxy in `frontend/vite.config.js`.

## 📞 Support

For issues or questions, please check:
1. All dependencies are installed
2. Both backend and frontend servers are running
3. Database has been seeded with sample data
4. Correct ports are being used

---

**Built with ❤️ for Hindi and English readers**

**हिंदी और अंग्रेजी पाठकों के लिए ❤️ के साथ बनाया गया**
