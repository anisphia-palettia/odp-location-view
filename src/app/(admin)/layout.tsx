import "@/styles/globals.css";

export default function AdminLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="container mx-auto p-4">{children}</main>
    );
}
