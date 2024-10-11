import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) =>
      new DataSource({
        type: 'postgres',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../**/*.migrations{.ts,.js}'],
        synchronize: false,
        url: configService.get<string>('db'),
        logging: true,
      })
        .initialize()
        .then(async (source) => {
          await source.runMigrations();
          return source;
        }),
    inject: [ConfigService],
  },
];
