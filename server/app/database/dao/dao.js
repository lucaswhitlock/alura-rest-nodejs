import "@babel/polyfill";
import { Invalid, NotFound, NotSupported } from "../../config/error/error";
import { mergeObjects } from "../../config/utils/utils";

class DAO {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    try {
      return await this.model.findAll({ raw: true });
    } catch (error) {
      throw new NotFound(this.model.getTableName());
    }
  }

  async findById(id) {
    try {
      return await this.model.findOne({ raw: true, where: { id: id } });
    } catch (error) {
      throw new NotFound(this.model.getTableName());
    }
  }

  async create(entity) {
    try {
      return await this.model.create(entity);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(newEntity) {
    try {
      await this.findById(newEntity.id).then(entity => {
        this.model.update(mergeObjects(entity, newEntity), { where: { id: newEntity.id } })
          .then(updatedEntity => {
            return updatedEntity;
          });
      });
    } catch (error) {
      throw new NotFound(this.model.getTableName());
    }
  }

  async remove(id) {
    try {
      await this.findById(id).then(entity => {
        this.model.destroy({ where: { id: entity.id }})
          .then(destroyedRows => {
            return destroyedRows;
          });
      });
    } catch (error) {
      throw new NotFound(this.model.getTableName());
    }
  }
}

export { DAO };
