import { Controller, Inject } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class RedisController {
  constructor(
    private readonly redisService: RedisService,
    @Inject('REDIS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }
  //receive the data from the mqtt controller and call the storeMqttMessages method from the RedisService
  @EventPattern('storeMqttMessages')
  async storeMqttMessages(data: any) {
    console.log('Received data from mqtt controller :::::::', data);
    //return this.redisService.storeMqttMessages(data);
    //store messages in an a redis list
    this.client.connect.bind('storeMqttMessages', data);
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
