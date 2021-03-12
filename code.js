// import
const AWS = require('aws-sdk')
const sm = new AWS.SecretsManager({region: 'us-west-2'})
const ddb = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2'
})

// returns apikey string for the given SecretId
const getSecrets = async(SecretId) => {
    return await new Promise((resolve, reject) => {
        sm.getSecretValue({SecretId}, (err, result) => {
            if (err) reject (err)
            else resolve(JSON.parse(result.SecretString))
        })
    })
}

// main function to handle requests
const main = async (event) => {

    console.log('Event:', event)
    const {apikey} = await getSecrets(process.env.prod ? 'prod_secret' : 'test_secret')

    if (event.headers['X-API-KEY'] != apikey) {
        const invalidApiKeyResponse = {
            statusCode: 401
        }
        return invalidApiKeyResponse;
    }    

    if (event.path == "/request1") {    
        const scan_params = {
            TableName: 'UrlHitCountTable'
        };
        var scan_res = await ddb.scan(scan_params).promise();
        
        var items = [];
        for(var i=0; i<scan_res.Items.length; i++) {
            var item = {
                "urltail": scan_res.Items[i]['id'],
                "hitcount": scan_res.Items[i]['count'],
            }
            items.push(item);
        }

        const listResponse = {
            statusCode: 200,
            body: JSON.stringify(items)
        }
        return listResponse;
    }

    const get_params = {
        TableName: 'UrlHitCountTable',
        Key: {
            "id": event.path
        }
    };
    
    var val = await ddb.get(get_params).promise(); 
    var count = 1;

    if (val.Item) {
        count = parseInt(val.Item.count) + 1;
    }

    const put_params = {
        TableName: 'UrlHitCountTable',
        Item: {
            "id": event.path,
            "count": count.toString(),
            "request": event
        }
    };

    return await ddb.put(put_params).promise();
};

exports.handler = main
