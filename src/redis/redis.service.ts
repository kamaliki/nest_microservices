import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(); // Assuming Redis server is running on default port and host
  }

  async storeMqttMessage(message: any): Promise<void> {
    await this.redisClient.lpush('mqtt_messages', JSON.stringify(message));
  }
}
