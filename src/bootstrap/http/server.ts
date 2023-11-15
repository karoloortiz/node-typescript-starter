import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { logger } from "../logger";
import * as config from "../../config";
import { healthRouter } from "./health";
import { generativeaiRouter } from "../../modules/digital-product-manager/infra/http/routes/generativeai";
import { designSystemRouter } from "../../modules/design-system-builder/infra/http/routes/designSystemRoute";
import { projectComposerRouter } from "../../modules/project-composer/infra/http/routes/projectComposer";

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*",
};

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use(healthRouter);
app.use(generativeaiRouter);
app.use(designSystemRouter);
app.use(projectComposerRouter);

const port = config.server.port;

export const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
