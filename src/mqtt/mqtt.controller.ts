import { Controller } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { RedisService } from '../redis/redis.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MqttController {
  constructor(
    private readonly mqttService: MqttService,
    private readonly redisService: RedisService,
  ) {}

  @MessagePattern('test/#')
  async handleMessage(@Payload() data: any) {
    console.log('Received data :::::::', data);
    await this.redisService.storeMqttMessage(data);
    return this.mqttService.handleMessage(data);
  }
}
