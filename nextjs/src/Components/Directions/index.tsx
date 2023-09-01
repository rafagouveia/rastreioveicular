
import { IDirectionsType } from "@/utils/types"
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js"
import { Button } from "@nextui-org/react"

type DirectionsProps = {
    data: IDirectionsType
}
export default function Directions({ data }: DirectionsProps) {
    const createRoute = async () => {
        const startAddress = data!.routes[0].legs[0].start_address
        const endAddress = data!.routes[0].legs[0].end_address
        console.log(data)
        const response = await fetch("http://localhost:3001/api/routes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${startAddress} - ${endAddress}`,
                source_id: data!.request.origin.place_id,
                destination_id: data!.request.destination.place_id,
            }),
        });
        const route = await response.json();
    }
    return (
        <div className="bg-zinc-700 mt-10 rounded-lg p-5">
            <div>
                <strong className="text-zinc-200">Origem:</strong>
                <p className="text-zinc-400 font-bold">- {data.routes[0].legs[0].start_address}</p>
            </div>
            <div>
                <strong className="text-zinc-200">Destino:</strong>
                <p className="text-zinc-400  font-bold">- {data.routes[0].legs[0].end_address}</p>
            </div>
            <Button size="lg" onClick={createRoute} fullWidth className="bg-yellow-500 font-bold text-yellow-900 mt-5">Criar Rota</Button>
        </div>
    )
}