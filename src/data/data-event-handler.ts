import EventBus from "../event-bus";
import Logger from "../logger";
import DataEventNames from "./events/data-events-names";
import { DataCommandHandler } from "./data-command-handler";

const logger = new Logger("[DataEventHandler] ->");

export class DataEventHandler {
  constructor(
    private eventBus: EventBus,
    private commandHandler: DataCommandHandler
  ) {
    this.eventBus.subscribe("data", (event) => {
      logger.debug("handle", event.type);
      switch (event.type) {
        case DataEventNames.CreateRequested: {
          if (Math.random() < 0.9) {
            this.commandHandler.acceptDataCreation(event.data.id);
          } else {
            this.commandHandler.rejectDataCreation(
              event.data.id,
              "you can not create this Data!"
            );
          }
        }
      }
    });
  }
}
