import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { getMenusByRestaurant } from '../../utils/helpers'
import { restaurantExists } from './generateUploadUrl';
import { createLogger } from '../../utils/logger';
const logger = createLogger('Menu')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const restaurantId = event.pathParameters.restaurantId
    //check if todo item exists
    const validRestaurantId = await restaurantExists(restaurantId)

    if (!validRestaurantId) {
        logger.error("No restaurant found with id ", restaurantId)
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                error: 'Restaurant item does not exist'
            })
        }
    }

    const menus = await getMenusByRestaurant(restaurantId)
    console.log(event)
    return {
        statusCode: 200,
        body: JSON.stringify(menus),
    };
}

