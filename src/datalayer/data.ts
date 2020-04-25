import 'source-map-support/register'
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Restaurant } from "../models/Restaurant";
import { UpdateRestaurantRequest } from "../Request/UpdateRestaurantRequest"

import { createLogger } from '../../src/utils/logger'
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const logger = createLogger("restaurant")
export class Data {

    //define constructor params here
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly restaurantTable = process.env.RESTAURANT_TABLE,
        private readonly bucketName = process.env.S3_BUCKET,

) {
    }
    async  createRestaurant( restaurant: Restaurant): Promise<Restaurant>{
        //logic for saving the content to the database here.
        logger.info("Restaurent creation ", restaurant)
        await this.docClient.put({
            TableName: this.restaurantTable,
            Item: restaurant
        }).promise()

        return restaurant
    }
    async getRestaurant(userId: string): Promise<Restaurant[]> {
        const result = await this.docClient.query({
            TableName: this.restaurantTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()



        const items = result.Items
        return items as Restaurant[]
    }
    async updateRestaurant(restaurantId: string, restaurant: UpdateRestaurantRequest): Promise<UpdateRestaurantRequest> {
        var params = {
            TableName: this.restaurantTable,
            Key: {
                restaurantId: restaurantId
            },
            UpdateExpression: "set #n = :r, phone=:p, #m = :l, updatedAt = :u",
            ExpressionAttributeValues: {
                ":r": restaurant.name,
                ":p": restaurant.phone,
                ":l": restaurant.location,
                ":u": restaurant.updatedAt
            },
            ExpressionAttributeNames: {
                "#n": "name",
                "#m": "location"
            },
            ReturnValues: "UPDATED_NEW"
        };

        await this.docClient.update(params).promise()
        logger.info("Update was successful")
        return restaurant

    }

    async generateUploadUrl(restaurantId: string): Promise<String> {
        const url = getUploadUrl(restaurantId, this.bucketName)

        const attachmentUrl: string = 'https://' + this.bucketName + '.s3.amazonaws.com/' + restaurantId

        const options = {
            TableName: this.restaurantTable,
            Key: {
                restaurantId: restaurantId,
            },
            UpdateExpression: "set attachmentUrl = :r",
            ExpressionAttributeValues: {
                ":r": attachmentUrl
            },
            ReturnValues: "UPDATED_NEW"
        };

        await this.docClient.update(options).promise()
        logger.info("Presigned url generated successfully ", url)

        return url;
    }

}


function getUploadUrl(restaurantId: string, bucketName: string): string {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: restaurantId,
        Expires: parseInt(urlExpiration)
    })
}
function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance')
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}
