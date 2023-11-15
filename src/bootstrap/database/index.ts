import { MongoClient } from "mongodb";
import { isProduction, db } from "../../config";
import { logger } from "../logger";

// Connection URI
let uri: string;

if (isProduction) {
  uri = `mongodb+srv://${db.username}:${db.password}@${db.host}/${db.name}?retryWrites=true&w=majority`;
} else {
  uri = `mongodb://${db.host}:${db.port}/${db.name}`;
}

// Create a new MongoClient
export const mongoClient = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await mongoClient.connect();

    // Establish and verify connection
    await mongoClient.db("admin").command({ ping: 1 });
    logger.info("Connected successfully to Database");
  } catch (error) {
    logger.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoClient.close();
  }
}
run();
