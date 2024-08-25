import express from "express";
import { config } from "dotenv"; // import config from .env file
import morgan from "morgan";
import appRouter from "./routes/index.js";
config(); // connect mongodb
const app = express();
// middlewares
app.use(express.json()); //would use the incoming data in json form
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map