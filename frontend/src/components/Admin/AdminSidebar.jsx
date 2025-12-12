import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookPlus, BookMarked, ShoppingBag, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
    const location = useLocation();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/books/add', label: 'Add Book', icon: BookPlus },
        { path: '/admin/books', label: 'Manage Books', icon: BookMarked },
        { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    ];

    return (
        <aside className="w-64 bg-admin-gray-50 dark:bg-admin-gray-900 min-h-screen border-r border-admin-gray-200 dark:border-admin-gray-700">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-admin-gray-900 dark:text-admin-gray-100">
                    Admin Panel
                </h1>
            </div>

            <nav className="px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${isActive
                                    ? 'bg-royal-blue text-white'
                                    : 'text-admin-gray-700 dark:text-admin-gray-300 hover:bg-admin-gray-200 dark:hover:bg-admin-gray-800'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 w-full text-admin-gray-700 dark:text-admin-gray-300 hover:bg-admin-gray-200 dark:hover:bg-admin-gray-800 transition-colors mt-8"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </aside>
    );
}
