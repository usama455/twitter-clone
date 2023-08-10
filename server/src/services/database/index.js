import mongoose from "mongoose";
import { logger } from "../../utils";
const mongoURI = process.env.DATABASE_URI;
const maxRetries = 3; // Maximum number of connection retry attempts

export const connectDatabase = (retryCount = 0) => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    logger.error(error);
    if (retryCount < maxRetries) {
      console.log(`Error in connecting to the database. Retrying... (Attempt ${retryCount + 1} of ${maxRetries})`);
      setTimeout(() => {
        connectDatabase(retryCount + 1); // Retry the connection
      }, 2000); // Delay for 2 seconds before retrying
    } else {
      console.log(`Max connection retries reached (${maxRetries}). Exiting...`);
      process.exit(1); // Exit the process after max retries
    }
  });

  db.once("open", () => {
    console.log("DB Connected Successfully!");
  });
};
