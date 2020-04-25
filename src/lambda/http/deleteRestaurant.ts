import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { deleteRestaurant } from '../../businessLayer/data'
const logger = createLogger('restaurant')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.warn("Proccessing delete event on restaurant", event)
    const restaurantId = event.pathParameters.restaurantId
    const userId = getUserId(event);

    //  Remove a Restaurant item by id
    await deleteRestaurant(userId, restaurantId)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: " "
    }
}
