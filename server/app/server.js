import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";

import { database } from "./database/database";
import { router } from "./routes/router";

import { checkMiddlewareErrorStatusCode } from "./config/error/error";
import ResponseModel from "./config/response/responseModel";

var server = express();

server.use(cors());
server.use(json({ limit: "50mb" }));
server.use(urlencoded({ limit: "50mb", extended: true }));

server.use("/api", router);

server.use((err, req, res, next) => {
  res
    .status(checkMiddlewareErrorStatusCode(err))
    .send(JSON.stringify(new ResponseModel(null, checkMiddlewareErrorStatusCode(err), err.message)));
});

database
  .instance
  .sync()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running at port :${process.env.PORT}`);
    });
  });