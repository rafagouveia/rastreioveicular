'use client'
import { useMap } from "@/hooks/useMap";
import { DirectionsResponseData, FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";
import { Button, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";



export type SideBarProps = {
    children?: React.ReactNode,
}

export default function SideBar({ children }: SideBarProps) {

    return (
        <div className="w-[400px] bg-zinc-900 pt-10 px-5">
            {children}
        </div>
    )
}