module.exports = {
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_NAME || 'matcha_db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        host: process.env.HOST || 'localhost'
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}