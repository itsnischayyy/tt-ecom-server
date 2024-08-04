import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'tt-ecom-db',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // Never use `synchronize` in production, use migrations instead
        migrations: ['dist/db/migrations/*{.ts,.js}'],
        // cli: {
        //   migrationsDir: 'src/migrations',
        // },
}

const dataSource = new DataSource (dataSourceOptions);

export default dataSource;