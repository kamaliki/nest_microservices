import { Injectable } from '@nestjs/common';
import {
    MessagePattern,
    Payload,
    Ctx,
    RedisContext,
  } from '@nestjs/microservices';

@Injectable()
export class RedisService {
    
    @MessagePattern('mqtt_messages')
    getMqttMessages(@Payload() data: number[], @Ctx() context: RedisContext) {
        console.log(`Channel: ${context.getChannel()}`);
    }
    
    @MessagePattern('mqtt_messages')
    storeMqttMessages(@Payload() data: number[]) {
        //store messages in an a redis list
        console.log('Storing data in Redis:::::', data);
        //store in a redis list
        //this.redisClient.lpush('mqtt_messages', JSON.stringify(data));


    }
}


