import { nanoid } from "nanoid";

export interface EventInfo {
  id: string;
  timestamp: number;
  data: any;
  type: string;
}

export class IEvent {
  private id: string;
  private timestamp: number;
  private data: any;
  private type: string;

  constructor(type: string, data: any) {
    this.id = nanoid();
    this.data = data;
    this.type = type;
    this.timestamp = Date.now();
  }

  get = (): EventInfo => ({
    timestamp: this.timestamp,
    id: this.id,
    type: this.type,
    data: this.data,
  });

  getType = () => this.type;
  getData = () => this.data;
  getTimestamp = () => this.timestamp;
  getId = () => this.id;
}
