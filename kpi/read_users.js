'use strict'

const request = require("request")
const secrets = require("./secrets.json")
const token = require("./token.json")

const options = {
    method: 'GET',
    url: `https://${secrets.domain}/api/v2/users`,
    headers: {'Authorization': `Bearer ${token.token}`}
}

request(options, function (error, response, body) {
    if (error) throw new Error(error)

    const users = JSON.parse(body)

    for (let user of users) {
        console.log(`${user.name} ${user.email}`)
    }
})
