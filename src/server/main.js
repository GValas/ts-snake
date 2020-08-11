const express = require('express')
const fs = require('fs')
const app = express()
const https = require('https')

app.use(express.static('dist'))
app.get('/', (req, res) => res.send('Error: no file to serve'))

https
    .createServer(
        {
            key: fs.readFileSync('resources/server.key'),
            cert: fs.readFileSync('resources/server.crt'),
        },
        app,
    )
    .listen(3000, () => console.log('Listening on port 3000'))
