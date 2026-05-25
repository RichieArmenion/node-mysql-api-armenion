import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
    const host = process.env.DB_HOST!;
    const port = parseInt(process.env.DB_PORT || '3306');
    const user = process.env.DB_USER!;
    const password = process.env.DB_PASSWORD!;
    const database = process.env.DB_NAME!;

    const connection = await mysql.createConnection({ host, port, user, password });

    // Create DB if it doesn't exist
    await connection.query(CREATE DATABASE IF NOT EXISTS \`${database}\;`);

    // Connect to DB
    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql'
    });

    // Init models
    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    // Define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Sync models with database
    await sequelize.sync();
}