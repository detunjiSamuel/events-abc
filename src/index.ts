import express, { Request, Response, NextFunction } from "express";
import { DataApi } from "./data/data-api";
import EventProducer from "./data/events-producer";
import { DataCommandHandler } from "./data/data-command-handler";
import EventBus from "./event-bus";
import DataView from "./data/query/data-view";
import EventStore from "./events-store";
import Logger from "./logger";

import { DataEventHandler } from "./data/data-event-handler";

const logger = new Logger("[API] --->");
const app = express();
const eventBus = new EventBus();
const eventProducer = new EventProducer(eventBus);
const eventStore = new EventStore(eventProducer);
const dataView = new DataView(eventBus);
const commandHandler = new DataCommandHandler(eventStore);

const dataApi = new DataApi(commandHandler, dataView);
new DataEventHandler(eventBus, commandHandler);

const expressCallback = (controller: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // add logger
    const response = controller({ body: req.body, params: req.params });
    return res.status(response.status).send(response.body);
  };
};

app.get("/data/publish", expressCallback(dataApi.publishData));
app.get("/data/update/:id", expressCallback(dataApi.editData));
app.get("/data/delete/:id", expressCallback(dataApi.deleteData));
app.get("/data/forget/:id", expressCallback(dataApi.forgetData));

app.get("/data", expressCallback(dataApi.getData));
app.get("/data/:id", expressCallback(dataApi.getDataById));

app.listen(3000 , () => {
 console.log("running")
});

app.get("/aggregate/:id", async (req, res) => {
  const data = eventStore.getCurrentAggregate(req.params.id);
  res.send(data);
});
