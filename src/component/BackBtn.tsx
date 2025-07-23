import BackIcon from "@/assets/back-icon";
import {useRouter} from "next/navigation";

export default function BackBtn() {
    const router = useRouter()
    return (
        <button className={"flex flex-row gap-2 btn items-center"} onClick={() => {
            router.back()
        }}>
            <BackIcon/>Kembali
        </button>
    )
}