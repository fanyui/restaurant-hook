import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { updateRestaurant } from '../../businessLayer/data'
import { UpdateRestaurantRequest } from '../../Request/UpdateRestaurantRequest';

import { createLogger } from '../../utils/logger'

const logger = createLogger("restaurant")

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    logger.info("processing update event ", event.body)
    const restaurantId = event.pathParameters.restaurantId
    let restuarantBody: UpdateRestaurantRequest = JSON.parse(event.body)

    const result = await updateRestaurant( restaurantId, restuarantBody)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
    };
}