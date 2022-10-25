import { apply } from "../apply-event";
import { DataInfo } from "./data";
import { EventInfo } from "../events";

export const replay = (
  initialState: DataInfo,
  events: EventInfo[]
): DataInfo => {
  return events.reduce((previous: DataInfo, current: EventInfo) => {
    return apply({ ...previous, version: previous.version + 1 }, current);
  }, initialState);
};
