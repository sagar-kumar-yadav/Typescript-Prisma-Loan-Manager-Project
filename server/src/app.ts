import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));


app.get("/", (_req, res) => {
  res.send("Server running 🚀");
});

export default app;
