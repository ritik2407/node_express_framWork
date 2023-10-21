import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        // username: {
        //     type: DataTypes.STRING(50),
        //     allowNull: false,
        //     unique: true,
        // },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export { User };
