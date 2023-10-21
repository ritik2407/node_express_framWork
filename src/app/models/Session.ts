import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

class Session extends Model {
  public id!: number;
  public userId!: string;
  public token!: string;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'sessions',
  }
);

export { Session };
