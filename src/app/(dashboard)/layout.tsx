import "@/styles/globals.css";
import SideBar from "@/component/Sidebar";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SideBar id={"dashboard-sidebar"}>
            {children}
        </SideBar>
    )
}
