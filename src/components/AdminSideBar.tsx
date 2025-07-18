import Link from "next/link";

export default function AdminSideBar({children, id}: { children: React.ReactNode, id: string }) {
    return (
        <div className={"drawer lg:drawer-open"}>
            <input id={id} type="checkbox" className="drawer-toggle"/>
            <div className={"drawer-content"}>
                {children}
            </div>
            <div className={"drawer-side"}>
                <label htmlFor={id} aria-label={"close sidebar"} className={"drawer-overlay"}>
                    <ul className={"menu bg-base-200 text-base-content min-h-screen w-80 p-4 mb-0"}>
                        <li><Link href={"/data-seluruh-teknisi"}>Data Seluruh Teknisi</Link></li>
                        <li><Link href={"/konfirmasi-odp"}>Konfirmasi ODP</Link></li>
                        <li><Link href={""}>ODP Tertolak</Link></li>
                    </ul>
                </label>
            </div>
        </div>
    )
}