import { EventEmitter } from "events";
import { IEvent, EventInfo } from "./events";
import Logger from "./logger";

const emitter = new EventEmitter();
const logger = new Logger("[Event-Bus]->");

export class EventBus {
  publish = (topic: string, event: IEvent) => {
    logger.debug("Event emitted");
    emitter.emit(topic, event.get());
  };

  subcribe = (topic: string, callback: (data: EventInfo) => void): void => {
    emitter.on(topic, (data) => {
      logger.debug(`received event in topic : ${topic}  =>>> data.type`);
      callback(data);
    });
  };
}
