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
        synchronize: true,
        url: configService.get<string>('db'),
        logging: true,
      }).initialize(),
    inject: [ConfigService],
  },
];
