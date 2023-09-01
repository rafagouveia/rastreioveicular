import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { Router } from "@prisma/client";


export class RouterSerializer implements Omit<Router, 'directions'> {
    id: string;
    name: string;
    source: {
        name: string;
        location: {
            lat: number;
            lng: number;
        };
    }
    destination: {
        name: string;
        location: {
            lat: number;
            lng: number;
        };
    }
    distance: number;
    duration: number;
    directions: DirectionsResponseData & { request: any };
    created_at: Date;
    updated_at: Date;
    constructor(route: Router) {
        this.id = route.id;
        this.name = route.name;
        this.source = route.source;
        this.destination = route.destination;
        this.distance = route.distance;
        this.duration = route.duration;
        if (typeof route.directions === 'string') {
            this.directions = JSON.parse(route.directions as string);;
        }
        this.created_at = route.created_at;
        this.updated_at = route.updated_at;
    }
}