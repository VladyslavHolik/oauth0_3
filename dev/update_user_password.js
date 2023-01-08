const request = require("request");
const secrets = require("./my_application_secrets.json")
const token = require("./token.json")
const userId = "auth0|63b9764b15883ca1142a441b"
const password = "newpass1234!!"

const options = {
    method: 'PATCH',
    url: `https://${secrets.domain}/api/v2/users/${userId}`,
    headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
    },
    body: JSON.stringify({
        'password': password,
        'connection': 'Username-Password-Authentication'
    })
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)

    const parsedBody = JSON.parse(body)
    console.log(parsedBody)
})
