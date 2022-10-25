import EventBus from "../event-bus";
import { IEvent } from "../events";
import Logger from "../logger";

const logger = new Logger("[Event-Producer] -->");
const eventLogger = new Logger("Event");

export class EventProducer {
  constructor(private eventBus: EventBus) {}

  publish = (...events: IEvent[]) => {
    for (const event of events) {
      logger.debug("publish event");
      eventLogger.info(event.getType());
      this.eventBus.publish("data", event);
    }
  };
}
