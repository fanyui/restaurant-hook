import { Restaurant } from "../models/Restaurant"
import { v4 as uuidv4} from 'uuid'
import { Data } from "../datalayer/data"
import { CreateRestaurantRequest } from "../Request/CreateRestaurantRequest"


const data = new Data()

export async function createRestaurant(
    createRestaurantRequest: CreateRestaurantRequest,
): Promise<Restaurant> {

    const restaurantId = uuidv4()

    const newRestaurant: Restaurant = {
        restaurantId: restaurantId,
        createdAt: new Date().toISOString(),
        name: createRestaurantRequest.name,
        location: createRestaurantRequest.location,
        phone: createRestaurantRequest.phone
    }

    return await data.createRestaurant(newRestaurant)
}