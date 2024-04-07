import { Controller, Inject } from '@nestjs/common';  
import { MqttService } from './mqtt.service';
import { MessagePattern, Payload, ClientProxy } from '@nestjs/microservices';
import { RedisService } from '../redis/redis.service';

@Controller()
export class MqttController {
  constructor(
    private readonly mqttService: MqttService,
    //private readonly redisService: RedisService,
    @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,
  ) {}

  @MessagePattern('test/#') //mqtt topic
  async handleMessage(@Payload() data: any) {
    console.log('Received data :::::::', data);
    //call the storeMqttMessages method from the RedisService
    //this.redisService.storeMqttMessages(data);
    this.redisClient.emit('storeMqttMessages', data);
    return this.mqttService.handleMessage(data);
  }
}
