import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async (DB_NAME) => {
    try {
        await connect(MONGODB_URI, {
            dbName: DB_NAME
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export default dbConnect;