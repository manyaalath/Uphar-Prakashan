import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Client Pages
import Home from './pages/Client/Home';
import ProductList from './pages/Client/ProductList';
import ProductDetails from './pages/Client/ProductDetails';
import Cart from './pages/Client/Cart';
import Login from './pages/Client/Login';
import Signup from './pages/Client/Signup';
import Checkout from './pages/Client/Checkout';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import AddBook from './pages/Admin/AddBook';
import EditBook from './pages/Admin/EditBook';

function App() {
    return (
        <I18nProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            {/* Public Client Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/books" element={<ProductList />} />
                            <Route path="/books/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected Client Routes */}
                            <Route
                                path="/checkout"
                                element={
                                    <ProtectedRoute>
                                        <Checkout />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/add-book"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AddBook />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/edit-book/:id"
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <EditBook />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </I18nProvider>
    );
}

export default App;
