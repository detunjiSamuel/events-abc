import { IEvent } from "../../events";
import DataEventNames from "./data-events-names";
import { DataInfo } from "../data";

export default class CreateDataAccepted extends IEvent {
  constructor(data: DataInfo) {
    super(DataEventNames.CreateAccepted, data);
  }
}
