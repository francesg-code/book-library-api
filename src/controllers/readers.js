const { Reader } = require("../models");

const create = (req, res) => {
  Reader.create(req.body).then((reader) => res.status(201).json(reader));
};
const list = (req, res) => {
  Reader.findAll().then((readers) => res.status(200).json(readers));
};

module.exports = { create, list };

