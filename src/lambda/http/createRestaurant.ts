import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { createRestaurant} from '../../businessLayer/data'
import { CreateRestaurantRequest } from '../../Request/CreateRestaurantRequest';

import { createLogger } from '../../utils/logger'

const logger = createLogger("restaurant")

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("processing event ", event.body)
    let body : CreateRestaurantRequest = JSON.parse(event.body)
    logger.info("body of log is ", body)
    const result = await createRestaurant(body)
    return {
        statusCode: 201,
        body: JSON.stringify(result),
    };
}