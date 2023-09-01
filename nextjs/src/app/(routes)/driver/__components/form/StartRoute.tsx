import { useMap } from "@/hooks/useMap";
import { fetcher } from "@/utils/http";
import { socket } from "@/utils/socket-io";
import { Route } from "@/utils/types";
import { Button, Select, SelectItem, Selection } from "@nextui-org/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import useSwr from "swr";
type StartRouteProps = {
    refMap: React.RefObject<HTMLDivElement>;
};
export default function StartRoute({ refMap }: StartRouteProps) {
    const map = useMap(refMap);
    const [value, setValue] = useState<
        string | number | readonly string[] | undefined
    >("");
    //const [d, setRoutes] = useState<IDirectionsType>();
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, [])
    const {
        data: routes,
        error,
        isLoading,
    } = useSwr<Route[]>("http://localhost:3001/api/routes", fetcher, {
        fallbackData: [],
    });

    const __startRoute = async (e: FormEvent) => {
        e.preventDefault();
        const routeId = value as string;
        const response = await fetch(`http://localhost:3001/api/routes/${routeId}`);
        const route: Route = await response.json();
        map?.removeAllRoutes();
        await map?.addRouteWithIcons({
          routeId: routeId,
          startMarkerOptions: {
            position: route.directions.routes[0].legs[0].start_location,
          },
          endMarkerOptions: {
            position: route.directions.routes[0].legs[0].end_location,
          },
          carMarkerOptions: {
            position: route.directions.routes[0].legs[0].start_location,
          },
        });
    
        const { steps } = route.directions.routes[0].legs[0];
    
        for (const step of steps) {
          await sleep(2000);
          map?.moveCar(routeId, step.start_location);
          socket.emit("new-points", {
            route_id: routeId,
            lat: step.start_location.lat,
            lng: step.start_location.lng,
          });
    
          await sleep(2000);
          map?.moveCar(routeId, step.end_location);
          socket.emit("new-points", {
            route_id: routeId,
            lat: step.end_location.lat,
            lng: step.end_location.lng,
          });
        }
    };

    let timeoutId: NodeJS.Timeout | null = null;
    const sleep = (ms: number) => {
        return new Promise((resolve) => {
            timeoutId = setTimeout(resolve, ms);
        });
    };

    return (
        <div>
            <div className="text-white pb-10">
                <p className="text-xl font-bold text-center">Minha Viagem</p>
            </div>
            <form onSubmit={__startRoute}>
                <Select
                    items={routes}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Selecione a Rota"
                    label="Selecione a Rota"
                >
                    {(route) => (
                        <SelectItem
                            key={route.id}
                            value={route.id}
                        >{`${route.name}`}</SelectItem>
                    )}
                </Select>
                <Button
                    isDisabled={isLoading || !value}
                    size="lg"
                    fullWidth
                    type="submit"
                    className="mt-5 bg-yellow-500 font-bold text-yellow-900"
                >
                    Iniciar Viagem
                </Button>
                <Link href="/new-route">
                    <Button
                        size="lg"
                        fullWidth
                        className="mt-5 bg-yellow-500 font-bold text-yellow-900"
                    >
                        Criar nova Rota
                    </Button>
                </Link>
            </form>
        </div>
    );
}
