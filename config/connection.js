import mongoose from 'mongoose'
import * as dotenv from 'dotenv';


dotenv.config();


async function connectToDb() {
    
    const URI=process.env.MONGO_URI??""
    
   
    try {
        await mongoose.connect(URI);
        console.log('====================================');
        console.log("MongoDB is Conncted");
        console.log('====================================');
        
    } catch (error) {
        console.error(error)
    }
}

export default connectToDb