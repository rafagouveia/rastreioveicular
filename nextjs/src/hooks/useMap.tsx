"use client"
import getCurrentPosition from "@/utils/geolocations";
import { Map } from "@/utils/map";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

export function useMap(containerRef: React.RefObject<HTMLDivElement>) {
    const [map, setMap] = useState<Map>();
    useEffect(() => {

        (async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                libraries: ["routes", "geometry"],
            })
            const [, , positon] = await Promise.all([
                loader.importLibrary("routes"),
                loader.importLibrary("geometry"),
                getCurrentPosition({ enableHighAccuracy: true })
            ])
            const map = new Map(containerRef.current!, {
                zoom: 15,
                center: positon
            })
            setMap(map)
        })()
    }, [containerRef])
    return map;
}