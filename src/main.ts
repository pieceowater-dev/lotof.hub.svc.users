// src/main.ts
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { bootstrap } from '@pieceowater-dev/lotof.lib.broadcaster';

bootstrap(AppModule, {
  portEnvVar: 'PORT',
  microservices: [
    {
      transport: Transport.RMQ,
      urlEnvVars: ['RABBITMQ_URL'],
      queue: 'template_queue',
    },
  ],
}).then((r) => console.log('Booted successfully 🚀'));
