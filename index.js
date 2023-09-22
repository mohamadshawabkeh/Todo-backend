'use strict';


require('dotenv').config();
const port = process.env.PORT || 3040;
const server = require('./src/server');
const { db } = require('./src/auth/models/index');


db.sync()
    .then(() => {
        server.start(port, () => {
            console.log(`server up on port ${port}`);
        })
    })








