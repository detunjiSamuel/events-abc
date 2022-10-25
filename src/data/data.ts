export interface CreateDataPayload {
  id: string;
  title: string;
  desc: string;
}

export interface PublicDataInfo {
  id: string;
  deleted: boolean;
  version: number;
  lastEventId: string;
}

export interface PrivateDataInfo {
  title: string;
  created: boolean;
  desc: string;
}

export interface DataInfo extends PrivateDataInfo, PublicDataInfo {}

export class Data {
  private id: string = "";
  private title: string = "";
  private desc: string = "";
  private deleted: boolean = false;
  private created: boolean = false;
  private version: number = 0;
  private lastEventId: string = "";

  constructor(dataInfo?: DataInfo) {
    if (dataInfo != null) {
      this.id = dataInfo.id;
      this.title = dataInfo.title;
      this.desc = dataInfo.desc;
      this.created = dataInfo.created ?? this.created;
      this.deleted = dataInfo.deleted ?? this.deleted;
      this.lastEventId = dataInfo.lastEventId ?? this.lastEventId;
    }
  }

  getData = (): DataInfo => ({
    id: this.id,
    title: this.title,
    desc: this.desc,
    created: this.created,
    lastEventId: this.lastEventId,
    version: this.version,
    deleted: this.deleted,
  });
}
