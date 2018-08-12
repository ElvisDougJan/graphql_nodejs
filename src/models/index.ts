import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';

// Definindo que a partir do diretório atual deverá usar o arquivo config.json como objeto
// somente quando estiver no modo definido na variavel env
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if (!db) {
  db = {};

  //Definindo aliases do sequelize
  //Veja mais em http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-aliases
  const operatorsAliases = false;

  config = Object.assign({operatorsAliases}, config);

// Definindo as configurações do banco com base no que está definido no config
// O último parametro não especifica porque irá usar o host e o dialect juntos
  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // lendo os arquivos que estão no diretório atual (models). O readdirSync retorna esses arquivos em um array
  fs.readdirSync(__dirname).filter((file: string) => {
    // Neste return dizemos que o arquivo não deve começar com ., não ter o mesmo nome do basename (index.js) e
    // que devem terminar com .js
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).forEach((file: string) => {
    // Aqui estamos importanto cada model deste diretório (já filtrado)
    const model = sequelize.import(path.join(__dirname, file));
    db[model['name']] = model;
  });

  // Verificando se os models possuem o metodo associate, se sim, irá atrelar a variável db
  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
}

// Dizendo que o db é to tipo DbConnection
export default <DbConnection>db;