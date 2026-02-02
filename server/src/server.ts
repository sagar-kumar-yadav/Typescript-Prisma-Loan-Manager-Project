import app from "./app";
import prisma, {testConnection} from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

// Test connection before starting server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
