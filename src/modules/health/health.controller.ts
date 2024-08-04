// src/modules/health/health.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class HealthController {
  constructor() {}

  @EventPattern('ping')
  handlePing(): string {
    console.log('got PING, sends PONG!');
    return 'PONG';
  }
  @EventPattern('template-event-pattern')
  async handleEvent(data: any) {
    console.log('new data from RabbitMQ:');
    console.log(data);
  }
}