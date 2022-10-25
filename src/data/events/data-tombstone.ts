import { IEvent } from "../../events";
import DataEventNames from "./data-events-names";

export default class DataTombstone extends IEvent {
  constructor(id: string) {
    super(DataEventNames.Tombstone, { id });
  }
}
