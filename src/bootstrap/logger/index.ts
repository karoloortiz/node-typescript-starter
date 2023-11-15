import * as winston from "winston";
import { isProduction } from "../../config";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: "log/error.log",
      level: "error",
      format: winston.format.timestamp(),
    }),
    new winston.transports.File({
      filename: "log/combined.log",
      level: "info",
      format: winston.format.timestamp(),
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (!isProduction) {
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}
