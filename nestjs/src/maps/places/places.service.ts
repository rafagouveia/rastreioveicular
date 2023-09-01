import { Client as GoogleMapsClient, PlaceInputType } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
    constructor(
        private googleMapsClient: GoogleMapsClient,
        private configService: ConfigService
    ) { }
    async findPlace(text: string) {
        const { data } = await this.googleMapsClient.findPlaceFromText({
            params: {
                input: text,
                inputtype: PlaceInputType.textQuery,
                fields: ['place_id', 'name', 'geometry', 'formatted_address'],
                key: this.configService.get('GOOGLE_MAPS_API_KEY')
            }
        });
        
        return data
    }
}