const express = require('express')
const fs = require('fs')
const app = express()
const https = require('https')

app.use(express.static('public'))
app.get('/', (req, res) => {
    return res.send('Error: no file to serve')
})

https
    .createServer(
        {
            key: fs.readFileSync('resources/server.key'),
            cert: fs.readFileSync('resources/server.crt'),
        },
        app,
    )
    .listen(12345, () => console.log('Listening on port 12345'))
