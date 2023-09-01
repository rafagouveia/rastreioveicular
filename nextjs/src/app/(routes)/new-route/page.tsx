'use client'
import MapsView from "@/Components/MapsView";
import SideBar from "@/Components/SideBar";
import { useRef } from "react";
import CreateRouteForm from "./__components/form/CreateRouteForm";

export function NewRoutePage() {
    const mapContainerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div className="min-w-min bg-zinc-900 pt-10 px-5 mi">
                <SideBar>
                    <CreateRouteForm refMap={mapContainerRef} />
                </SideBar>
            </div>
            <div className="flex w-full h-full bg-white">
                <MapsView refMap={mapContainerRef} />
            </div>
        </>
    )
}

export default NewRoutePage;