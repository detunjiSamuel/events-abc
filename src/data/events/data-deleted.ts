import { IEvent } from "../../events";
import DataEventNames from "./data-events-names";

export default class DataDeleted extends IEvent {
  constructor(id: string) {
    super(DataEventNames.Deleted, { id });
  }
}
