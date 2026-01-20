import mongoose from 'mongoose';

const MONGODB_URI = process.env.Mongo_URI;

if(!MONGODB_URI){
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/** 
 * Cached connection for MongoDB.
 * Require only in NextJS not in ReactJS
 */

interface MongooseCache{
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global{
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache;
}

let cached : MongooseCache = global.mongoose || {conn: null, promise: null};

if(!global.mongooseCache){
   global.mongooseCache = cached;
}

