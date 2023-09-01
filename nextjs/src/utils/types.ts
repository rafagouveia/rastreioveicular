import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export type IDirectionsType = DirectionsResponseData & { request: any };
export type ILocationType = { name: string; location: google.maps.LatLngLiteral }

export type Route = {
    id: string;
    name: string;
    source: ILocationType;
    destination: ILocationType;
    distance: number;
    duration: number;
    directions: IDirectionsType;
    created_at: Date;
    updated_at: Date;
}
