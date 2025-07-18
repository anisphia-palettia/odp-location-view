import "@/styles/globals.css";
import AdminSidebar from "@/components/AdminSideBar";

export default function AdminLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminSidebar id="sidebar">
            {children}
        </AdminSidebar>
    );
}
