import {
  create_data_accepted,
  create_data_rejected,
  create_data_requested,
  data_updated,
  data_deleted,
} from "./events";
import { CreateDataPayload, DataInfo } from "./data";
import EventStore from "../events-store";
import Logger from "../logger";
import DataTombstone from "./events/data-tombstone";

const logger = new Logger("[Data-Command-Service] -->");

export class DataCommandHandler {
  constructor(private eventStore: EventStore) {}

  requestToCreateData = (dataInfo: CreateDataPayload): void => {
    logger.debug("request to create data");
    const event = new create_data_requested(dataInfo);
    this.eventStore.createStream(dataInfo.id, event);
  };

  editData = (id: string, payload: Partial<DataInfo>): void => {
    logger.debug("edit data", id);
    const data = this.eventStore.getCurrentAggregate(id);
    const event = new data_updated(id, payload);
    this.eventStore.addEvent(id, event, data.lastEventId);
  };

  deleteData = (id: string): void => {
    logger.debug("delete data", id);
    const data = this.eventStore.getCurrentAggregate(id);
    if (!data) {
      throw new Error(
        "cannot delete data with id: " + id + " (it does not exist)"
      );
    }
    if (data.deleted) {
      throw new Error(
        "the data with the id: " + id + " has already been deleted"
      );
    }
    const event = new data_deleted(id);
    this.eventStore.addEvent(id, event, data.lastEventId);
  };

  acceptDataCreation = async (id: string) => {
    logger.debug("accept to create data", id);
    const data = this.eventStore.getCurrentAggregate(id);
    const event = new create_data_accepted(data);
    this.eventStore.addEvent(id, event, data.lastEventId);
  };

  rejectDataCreation = (id: string, reason: string): void => {
    logger.debug("rejected to create data", id);
    const data = this.eventStore.getCurrentAggregate(id);
    const event = new create_data_rejected(id, reason);
    this.eventStore.addEvent(id, event, data.lastEventId);
  };

  forgetData = (id: string): void => {
    logger.debug("forget data", id);
    const data = this.eventStore.getCurrentAggregate(id);
    if (!data) {
      throw new Error(
        "cannot forget data with id: " + id + " (it does not exist)"
      );
    }
    const event = new DataTombstone(id);
    this.eventStore.clearStream(id, event, data.lastEventId);
  };
}
