'use strict'

const request = require("request")
const fs = require('fs');
const secrets = require("./secrets.json")

const options = {
    method: 'POST',
    url: `https://${secrets.domain}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
        {
            client_id: `${secrets.clientId}`,
            client_secret: `${secrets.clientSecret}`,
            audience: `${secrets.audience}`,
            grant_type: 'client_credentials'
        }
}

request(options, function (error, response, body) {
    if (error) return console.error(error)

    let jsonBody = JSON.parse(body)
    const token = {token: jsonBody.access_token}
    fs.writeFileSync('./token.json', JSON.stringify(token), 'utf-8');

    console.dir(jsonBody, {depth: null, colors: true})
})
