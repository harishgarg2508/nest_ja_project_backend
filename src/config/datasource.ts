import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';
import { Auth } from 'src/auth/entities/auth.entity';

dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: [User,Auth],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;