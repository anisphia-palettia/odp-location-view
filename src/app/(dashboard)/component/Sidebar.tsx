'use client';
import {sidebarMenu} from "@/app/(dashboard)/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SideBar({children, id}: { children: React.ReactNode, id: string }) {
    const pathname = usePathname();

    return (
        <div className="drawer lg:drawer-open">
            <input id={id} type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <label htmlFor={id} className="btn btn-primary drawer-button lg:hidden w-fit m-4">
                    ☰ Menu
                </label>
                <div>
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 mb-0">
                    {sidebarMenu.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={isActive ? "active bg-primary" : ""}
                                    onClick={() => {
                                        const checkbox = document.getElementById(id) as HTMLInputElement | null;
                                        if (window.innerWidth < 1024 && checkbox) {
                                            checkbox.checked = false;
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
