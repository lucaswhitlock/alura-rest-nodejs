import { User } from "../../database/entities/user";
import { database } from "../../database/database";
import { DAO } from "../../database/dao/dao";

import ResponseModel from "../../config/response/responseModel";

const userDao = new DAO(database.users);

const findAllUsers = async (req, res) => {
  await userDao.findAll().then(data => {
    res.status(200).send(new ResponseModel(data, 200, "Ok!"));
  });
};

const findById = async (req, res, next) => {
  try {
    var user = new User({ id: req.params.id });
    await user.find();
    res.status(200).send(new ResponseModel(user, 200, "Ok!"));
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    var user = new User(req.body);
    await user.create().then(() => {
      res.status(201).send(new ResponseModel(user, 201, "Created!"));
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    var body = Object.assign({}, req.body, { id: req.params.id });
    var user = new User(body);
    await user.update();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    var user = new User({ id : req.params.id });
    await user.delete();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export { findAllUsers, findById, createUser, updateUser, deleteUser };
