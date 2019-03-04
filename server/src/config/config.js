import dotenv from 'dotenv';
import path from 'path';

if(process.env.NODE_ENV != 'production'){
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

module.exports = {
  jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret',
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://abhi:JDCecuq0oHIAEtYE@variabledev-shard-00-00-pgloa.mongodb.net:27017,variabledev-shard-00-01-pgloa.mongodb.net:27017,variabledev-shard-00-02-pgloa.mongodb.net:27017/test?ssl=true&replicaSet=variabledev-shard-0&authSource=admin&retryWrites=true'
  },
}