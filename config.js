module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '5000',
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://adamwjo:mongodbAdam@cluster0-esmpe.mongodb.net/test?retryWrites=true',
    SECRET: 'theflash'
}