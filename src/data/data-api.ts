import { nanoid } from "nanoid";
//@ts-ignore
import faker from "@codegrenade/naija-faker";

import Logger from "../logger";
import { DataInfo } from "./data";

const logger = new Logger("Data-Resource]->");

interface HttpRequest {
  body: any;
  params: any;
}

export class DataApi {
  constructor(private dataHandler, private queryService) {
    this.queryService;
  }
  publishData = ({ body }: HttpRequest) => {
    logger.debug("publish data");
    const { title, desc } = body ?? {
      title: faker.title(),
      desc: faker.name(),
    };
    if (!(title && desc)) return { status: 400, body: {} };
    const id: string = nanoid();
    // comband handler
    return { status: 201, body: { id } };
  };
  editData = ({ body, params }: HttpRequest) => {
    logger.debug("edit data");
    const { title, desc } = body ?? {
      title: faker.title(),
      desc: faker.name(),
    };
    const { id } = params;
    if (!(title || desc) || !id) return { status: 400, body: {} };

    // comband handler
    return { status: 202, body: { id } };
  };
  deleteData = ({ params }: HttpRequest) => {
    logger.debug("delete data");
    const { id } = params;
    if (!id) return { status: 400, body: {} };
    //comband handler

    return { status: 202, body: { id } };
  };

  forgetData = ({ params }: HttpRequest) => {
    logger.debug("forget data");
    const { id } = params;
    if (!id) return { status: 400, body: {} };
    //comband handler

    return { status: 202, body: { id } };
  };
  getData = () => {
    logger.debug("get data");
    try {
      // const data:DataInfo  =  query
      //@ts-ignore
      const data: DataInfo = [];
      return { status: 200, body: { data } };
    } catch (e) {
      return { status: 500, body: { error: e.message } };
    }
  };
  getDataById = ({ params }: HttpRequest) => {
    const { id } = params;
    logger.debug("get data by id", id);
    try {
      //@ts-ignore
      const data: DataInfo = [];
      return { status: 200, body: { data } };
    } catch (e) {
      return { status: 500, body: { error: e.message } };
    }
  };
}
