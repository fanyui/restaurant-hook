import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { getRestaurants } from '../../businessLayer/data'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const resp = await getRestaurants()
    console.log(event)
//    const resp = {
//        message: "all restaurant fetched success",
//        todos: [
//            {
//                name: "Iya Restaurant",
//                location: "Buea",
//                phone: "77777777"
//            },
//            {
//                name: "Dolly fast food Restaurant",
//                location: "Buea",
//                phone: "44447777"
//            },
//            {
//                name: "AFAyi food Restaurant",
//                location: "Buea",
//                phone: "44447777"
//            },
//        ]
//    }
    return {
        statusCode: 200,
        body: JSON.stringify(resp),
    };
}