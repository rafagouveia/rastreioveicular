"use client"
import {useMap} from "@/hooks/useMap"
import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef } from "react"

export default function MapsView({ refMap }: { refMap: React.RefObject<HTMLDivElement> }) {
    return (
        <div className="flex h-full w-full" ref={refMap} id="maps" />
    )
}