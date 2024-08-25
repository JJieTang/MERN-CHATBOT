import { connect, disconnect } from 'mongoose';

export default async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL); //wait until return a promise
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
    }
}

export {connectToDatabase, disconnectFromDatabase};