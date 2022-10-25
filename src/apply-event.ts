import { DataInfo } from "./data/data";
import DataEventNames from "./data/events/data-events-names";
import { EventInfo } from "./events";

export const apply = (state: DataInfo, event: EventInfo): DataInfo => {
  let updated: DataInfo = { ...state, lastEventId: event.id };
  switch (event.type) {
    case DataEventNames.CreateRequested:
      return {
        ...updated,
        id: event.data.id,
        title: event.data.title,
        desc: event.data.desc,
        created: false,
        deleted: false,
      };
      break;
    case DataEventNames.CreateAccepted:
      return { ...updated, created: true };
      break;
    case DataEventNames.CreateRejected:
      return { ...updated, created: false };
      break;
    case DataEventNames.Updated:
      return {
        ...updated,
        title: event.data.title || state.title,
        desc: event.data.desc || state.desc,
      };
      break;
    case DataEventNames.Deleted:
      return { ...updated, deleted: true };
      break;

    case DataEventNames.Tombstone:
      return { ...updated, title: "", desc: "", created: false, deleted: true };
      break;

    default:
      return { ...updated };
  }
};
