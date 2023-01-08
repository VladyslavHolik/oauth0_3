const request = require("request");
const fs = require("fs");
const secrets = require("./secrets.json")
const user_secrets = require("./user_secrets.json")

const options = {
    method: 'POST',
    url: `https://${secrets.domain}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        'client_id': `${secrets.clientId}`,
        'client_secret': `${secrets.clientSecret}`,
        'grant_type': 'refresh_token' ,
        'refresh_token': `${user_secrets.refresh_token}`
    }
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)

    const parsedBody = JSON.parse(body);
    const new_user_secrets = {
        access_token: parsedBody.access_token,
        refresh_token: user_secrets.refresh_token
    }
    fs.writeFileSync('./user_secrets.json', JSON.stringify(new_user_secrets), 'utf-8')
    console.log(body)
})
