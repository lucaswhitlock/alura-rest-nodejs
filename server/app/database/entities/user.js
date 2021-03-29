import moment from "moment";
import bcrypt from "bcrypt";

import { DAO } from "../dao/dao";
import { database } from "../database";
import { validateUser } from "../rules/users";
import { NotFound } from "../../config/error/error";

const model = database.users;

class User {
  constructor({ id, name, birth, login, password, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.birth = moment(birth);
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dao = new DAO(model);
  }

  async create() {
    let isValid = await validateUser(this, database);
    if (isValid) {
      await bcrypt.hash(this.password, 12).then(pswd => {
        this.password = pswd;
      });
      await this.dao.create({
        name: this.name,
        birth: this.birth,
        login: this.login,
        password: this.password
      }).then(newUser => {
        this.id = newUser.get("id");
        this.password = newUser.get("password");
        this.createdAt = newUser.get("createdAt");
        this.updatedAt = newUser.get("updatedAt");
      }).catch(err => {
        throw new Error(err.message);
      });
    }
  }

  async find() {
    await this.dao.findById(this.id).then(user => {
      this.name = user.name;
      this.birth = user.birth;
      this.login = user.login;
      this.password = user.password;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }).catch(err => {
      throw new NotFound(model.getTableName());
    });
  }

  async update() {
    await this.dao.update(this)
      .catch(err => {
        throw new NotFound(model.getTableName());
      });
  }

  async delete() {
    await dao.remove(this.id)
      .catch(err => {
        throw new Error(err.message);
      });
  }
};

export { User };
