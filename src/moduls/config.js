require('dotenv').config();

const option = {
    mysql:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mongo: {
        url: 'mongodb://localhost:27017/ecommerce'
    }
}

module.exports = { option };