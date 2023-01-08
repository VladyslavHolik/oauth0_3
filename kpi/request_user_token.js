const request = require("request");
const fs = require("fs");
const secrets = require("./secrets.json")

const options = {
    method: 'POST',
    url: `https://${secrets.domain}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: 'vladyslav_holik@xyz.com',
        password: 'john1234!!pass',
        audience: `${secrets.audience}`,
        scope: 'offline_access',
        realm: 'Username-Password-Authentication',
        client_id: `${secrets.clientId}`,
        client_secret: `${secrets.clientSecret}`
    }
}

request(options, function (error, response, body) {
    if (error) throw new Error(error)

    const parsedBody = JSON.parse(body)
    const user_secrets = {
        access_token: parsedBody.access_token,
        refresh_token: parsedBody.refresh_token
    }
    fs.writeFileSync('./user_secrets.json', JSON.stringify(user_secrets), 'utf-8')
    console.log(body)
})
