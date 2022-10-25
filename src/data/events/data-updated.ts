import { IEvent } from "../../events";
import DataEventNames from "./data-events-names";
import { DataInfo } from "../data";

export default class DataUpdated extends IEvent {
  constructor(id: string, payload: Partial<DataInfo>) {
    super(DataEventNames.Updated, { id, ...payload });
  }
}
