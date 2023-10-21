import { Sequelize } from 'sequelize';
import { environment } from './environment';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = environment;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

export { sequelize };
export default sequelize;
