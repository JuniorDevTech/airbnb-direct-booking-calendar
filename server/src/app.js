import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import routes from "./routes/index.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
