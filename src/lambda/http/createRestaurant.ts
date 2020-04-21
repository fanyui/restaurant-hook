import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { createRestaurant} from '../../businessLayer/data'
import { CreateRestaurantRequest } from '../../Request/CreateRestaurantRequest';
import { getUserId } from '../utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger("restaurant")

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("processing event ", event.body)
    const userId = getUserId(event);
    logger.info('auth user id ', userId)
    let body : CreateRestaurantRequest = JSON.parse(event.body)
    logger.info("body of log is ", body)
    const result = await createRestaurant(body, userId)
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
    };
}