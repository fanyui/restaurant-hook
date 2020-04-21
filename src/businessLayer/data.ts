import { Restaurant } from "../models/Restaurant"
import { v4 as uuidv4} from 'uuid'
import { Data } from "../datalayer/data"
import { CreateRestaurantRequest } from "../Request/CreateRestaurantRequest"
import { UpdateRestaurantRequest } from "../Request/UpdateRestaurantRequest"

const data = new Data()
export async function updateRestaurant(id: string, updateRestaurantRequest: UpdateRestaurantRequest): Promise<UpdateRestaurantRequest> {
    const updateItem : UpdateRestaurantRequest = {
        updatedAt: new Date().toISOString(),
        ...updateRestaurantRequest
    }
    return await data.updateRestaurant(id, updateItem)
}

export async function createRestaurant(
    createRestaurantRequest: CreateRestaurantRequest,
    userId: string
): Promise<Restaurant> {

    const restaurantId = uuidv4()

    const newRestaurant: Restaurant = {
        userId: userId,
        restaurantId: restaurantId,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        name: createRestaurantRequest.name,
        location: createRestaurantRequest.location,
        phone: createRestaurantRequest.phone
    }

    return await data.createRestaurant(newRestaurant)
}

export async function getRestaurants(userId: string) : Promise<Restaurant[]>{
    return data.getRestaurant(userId)
}

export async function generateUploadUrl(restaurantId: string): Promise<String> {
    return data.generateUploadUrl(restaurantId)
}