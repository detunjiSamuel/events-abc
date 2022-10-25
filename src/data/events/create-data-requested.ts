import { IEvent } from "../../events";
import { CreateDataPayload } from "../data";
import DataEventNames from "./data-events-names";

export default class CreateDataRequested extends IEvent {
  constructor(dataInfo: CreateDataPayload) {
    super(DataEventNames.CreateRequested, dataInfo);
  }
}
