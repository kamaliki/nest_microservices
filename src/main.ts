import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: new ConfigService().get('MQTT_URL'),
    },
  });
  await mqttApp.listen();

  const redisApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: new ConfigService().get('REDIS_HOST'),
      port: new ConfigService().get('REDIS_PORT'),
    },
  });
  await redisApp.listen();
}
bootstrap();
