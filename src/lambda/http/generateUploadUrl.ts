import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

import { createLogger } from '../../utils/logger'
import { generateUploadUrl } from '../../businessLayer/data'
import { getUserId } from '../utils'
const docClient = new AWS.DynamoDB.DocumentClient()

const restaurantTable = process.env.RESTAURANT_TABLE
const logger = createLogger('Restaurant')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(" Processing event for generating signed url", event)
    const userId = getUserId(event)
    const restaurantId = event.pathParameters.restaurantId
    //const userId = getUserId(event);
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

    //check if todo item exists
    const validRestaurantId = await restaurantExists(userId, restaurantId )

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

    let url = await generateUploadUrl(restaurantId)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: url
        })
    }

}


export async function restaurantExists(userId: string, restaurantId: string) {

    const result = await docClient
        .get({
            TableName: restaurantTable,
            Key: {
                userId: userId,
                restaurantId: restaurantId
            }
        })
        .promise()

    return !!result.Item
}