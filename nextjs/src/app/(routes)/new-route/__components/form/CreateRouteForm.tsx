import Directions from "@/Components/Directions";
import { useMap } from "@/hooks/useMap";
import { socket } from "@/utils/socket-io";
import { IDirectionsType } from "@/utils/types";
import { DirectionsResponseData, FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";
import { Button, Input } from "@nextui-org/react"
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type CreateRouteFormProps = {
    refMap: React.RefObject<HTMLDivElement>
}

export default function CreateRouteForm({ refMap }: CreateRouteFormProps) {
    const map = useMap(refMap)
    const [directionsData, setDirectionsData] = useState<IDirectionsType>();
    const __searchRoute = async (e: FormEvent) => {

        e.preventDefault();

        const source = (document.getElementById("source") as HTMLInputElement).value
        const destination = (document.getElementById("destination") as HTMLInputElement).value
        const [sourceResponse, destinationResponse] = await Promise.all([
            fetch(`http://localhost:3001/api/places?text=${source}`),
            fetch(`http://localhost:3001/api/places?text=${destination}`)
        ])
        const [sourceData, destinationData]: FindPlaceFromTextResponseData[] = await Promise.all([
            sourceResponse.json(),
            destinationResponse.json()
        ])
        if (sourceData.status !== "OK") {
            console.log(sourceData)
            alert("Origem não encontrado")
            return;
        }
        if (destinationData.status !== "OK") {
            console.log(destinationData)
            alert("Destino não encontrado")
            return;
        }
        const sourceId = sourceData.candidates[0].place_id
        const destinationId = destinationData.candidates[0].place_id

        const directionsReponse = await fetch(`http://localhost:3001/api/directions?originId=${sourceId}&destinationId=${destinationId}`)
        const directionsData: IDirectionsType = await directionsReponse.json()
        setDirectionsData(directionsData);

        map?.removeAllRoutes();
        await map?.addRouteWithIcons({
            routeId: "1",
            startMarkerOptions: {
                position: directionsData.routes[0].legs[0].start_location,
            },
            endMarkerOptions: {
                position: directionsData.routes[0].legs[0].end_location,
            },
            carMarkerOptions: {
                position: directionsData.routes[0].legs[0].start_location
            },
        })
        console.log("achei no mapa")

    }

    return (
        <>
            <form onSubmit={__searchRoute}>
                <div className="text-white pb-10">
                    <p className="text-xl font-bold text-center">Criar Rota</p>
                </div>
                <div className="space-y-5">
                    <Input id="source" size="lg" placeholder="Origem" type="text" required name="source" />
                    <Input id="destination" size="lg" placeholder="Destino" type="text" required name="destination" />
                    <Button type="submit" size="lg" fullWidth className="bg-yellow-500 font-bold text-yellow-900">Pesquisar</Button>
                    <Link href="/driver ">
                        <Button type="button" size="lg" fullWidth className="bg-yellow-500 font-bold text-yellow-900 mt-5">Minhas Viagens</Button>
                    </Link>
                </div>
            </form>
            {directionsData && (
                <Directions data={directionsData} />
            )}
        </>
    )
}