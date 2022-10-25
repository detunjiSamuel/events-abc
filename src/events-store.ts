import Entities from "./entity-interface";
import { EventInfo } from "./events";

export default class EventStore {
  private streams: Entities<EventInfo[]> = {};
  // snapshots
  private readonly maxSnapshots: number = 5;
  private readonly requiredEventsToCreateSnapshots: number = 10;

  
}
