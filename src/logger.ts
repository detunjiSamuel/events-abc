import pino from "pino";

export default class Logger {
  private logger: pino.Logger;

  constructor(private prefix: string = "", level = "info") {
    const options: pino.LoggerOptions = {
      prettifier: require("pino-pretty"),
      level,
    };
    this.logger = pino(options);
    this.debug("logger created", options);
  }

  public debug(message: string, ...args: any[]) {
    this.logger.debug(this._prefix, message, ...args);
  }
  public error(message: string, ...args: any[]) {
    this.logger.error(this._prefix, message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(message, this._prefix, ...args);
  }

  public info(message: string, ...args: any[]) {
    this.logger.info(message, this._prefix, ...args);
  }
  private get _prefix(): string {
    return this.prefix + ":";
  }
}
