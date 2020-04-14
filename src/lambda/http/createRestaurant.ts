import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { createRestaurant} from '../../businessLayer/data'
import { CreateRestaurantRequest } from '../../Request/CreateRestaurantRequest';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body : CreateRestaurantRequest = JSON.parse(event.body)

    const result = createRestaurant(body)
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}