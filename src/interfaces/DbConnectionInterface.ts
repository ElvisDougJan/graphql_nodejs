import * as Sequelize from "sequelize";
import { ModelsInterface } from "./ModelInterfaces";

export interface DbConnection extends ModelsInterface {
  sequelize: Sequelize.Sequelize;
}