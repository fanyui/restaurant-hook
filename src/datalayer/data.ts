import 'source-map-support/register'

import { Restaurant } from "../models/Restaurant";


export class Data {

    //define constructor params here
    constructor() {
    }
    async  createRestaurant( restaurant: Restaurant): Promise<Restaurant>{
        //logic for saving the content to the database here.
        return   restaurant;
    }
}