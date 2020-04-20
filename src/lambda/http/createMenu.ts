import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import { restaurantExists } from './generateUploadUrl'
import { CreateMenuRequest } from '../../Request/CreateMenuRequest'
const docClient = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

const menuTable = process.env.MENUS_TABLE
const bucketName = process.env.S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
    const restaurantId = event.pathParameters.restaurantId
    const validRestau = await restaurantExists(restaurantId)

    if (!validRestau) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: 'REstauarant  does not exist'
            })
        }
    }

    const menuId = uuid.v4()
    const newItem = await createMenu(restaurantId, menuId, event)

    const url = getUploadUrl(menuId)

    return {
        statusCode: 201,
        body: JSON.stringify({
            newItem: newItem,
            uploadUrl: url
        })
    }
}




async function createMenu(restaurantId: string, menuId: string, event: any) {
    const timestamp = new Date().toISOString()
    // const stringed = JSON.stringify(event.body)
    const newMenu: CreateMenuRequest = JSON.parse(event.body)

    const newItem = {
        restaurantId,
        timestamp,
        menuId,
        ...newMenu,
        imageUrl: `https://${bucketName}.s3.amazonaws.com/${menuId}`
    }
    console.log('Storing new item: ', newItem)

    await docClient
        .put({
            TableName: menuTable,
            Item: newItem
        })
        .promise()

    return newItem
}

function getUploadUrl(menuId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: menuId,
        Expires: parseInt(urlExpiration)
    })
}
