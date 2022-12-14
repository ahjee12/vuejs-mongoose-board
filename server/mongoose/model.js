const mongoose = require("mongoose")
const schema = require('./schema')
require('dotenv').config()

// db 연결
const db = mongoose.connection;

const model = (() => {
    db.on('error', console.error);
    db.on('open', () => {
        console.log('Connecting mongodb!')
    })

    // Atlas mongodb cluster와 연결
    mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@firstfullstackapp.xxq7zg2.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )

    // 스키마 연결
    const model = {}
    for (let key in schema) {
        model[key] = mongoose.model(key, schema[key])
    }

    return model
})()

module.exports = model;