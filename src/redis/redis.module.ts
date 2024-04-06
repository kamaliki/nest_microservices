import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: new ConfigService().get('REDIS_HOST'),
          port: new ConfigService().get('REDIS_PORT'),
        }
      },
    ]),
  ],
  exports: [RedisService],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
