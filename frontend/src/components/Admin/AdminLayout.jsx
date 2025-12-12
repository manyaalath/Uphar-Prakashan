import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-admin-gray-50 dark:bg-[#121212]">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
