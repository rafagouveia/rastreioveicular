import Header from "@/Components/Header"
import { Navbar } from "@nextui-org/react"

export default function RouteMapLayout({ children }: { children: React.ReactNode }) {
    return (

        <div className="flex flex-col bg-yellow-500 h-screen w-screen">
            <Header />
            <div className="h-full">
                <div className="flex rounded-t-xl overflow-hidden h-full shadow-xl min-w-min">
                    {children}
                </div>
            </div>
        </div>
    )
}