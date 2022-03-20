const express = require("express");
const readerControllers = require("./controllers/readers");

const app = express();

app.use(express.json());

app.post("/readers", readerControllers.create);

app.get("/readers", readerControllers.list);

app.patch("/readers/:id", readerControllers.update);

app.delete("/readers/:id", readerControllers.deleteReader);


module.exports = app;
