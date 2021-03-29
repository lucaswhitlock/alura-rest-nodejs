import { DataTypes } from "sequelize";

const users = sequelize => {
  return sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "users",
      freezeTableName: true,
      timestamps: true
    }
  );
};

export { users };
