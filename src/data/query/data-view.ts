import { apply } from "../../apply-event";
import Entities from "../../entity-interface";
import EventBus from "../../event-bus";
import Logger from "../../logger";

import { DataInfo } from "../data";

const logger = new Logger("[Data-View] ->");

export default class DataView {
  private entities: Entities<DataInfo> = {};

  constructor(private eventBus: EventBus) {
    this.eventBus.subcribe("data", (event) => {
      this.entities[event.data.id] = apply(this.entities[event.data.id], event);
      logger.debug("updated", this.entities);
    });
  }
  getAllData = (): DataInfo[] => {
    return Object.keys(this.entities)
      .map((key) => this.entities[key])
      .filter((i) => !i.deleted);
  };

  getDataById = (id: string): DataInfo => {
    const data = this.entities[id];
    if (!data || data.deleted) {
      throw new Error("Data with id " + id + " was not found");
    }
    return data;
  };
}
