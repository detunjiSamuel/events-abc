import { IEvent } from "../../events";

import DataEventNames from "./data-events-names";

export default class CreateDataRejected extends IEvent {
  constructor(dataId: string, reason: string) {
    super(DataEventNames.CreateRejected, { id: dataId, reason: reason });
  }
}
