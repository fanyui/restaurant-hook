import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

const menusTable = process.env.MENUS_TABLE


export async function getMenusByRestaurant(restaurantId: string) {
    const result = await docClient.query({
        TableName: menusTable,
        KeyConditionExpression: 'restaurantId = :restaurantId',
        ExpressionAttributeValues: {
            ':restaurantId': restaurantId
        },
        ScanIndexForward: false
    }).promise()
    return result.Items
}

