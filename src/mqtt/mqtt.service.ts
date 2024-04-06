import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttService {
  async handleMessage(data: any): Promise<any> {
    console.log('Received data 3 :::::::', data);
    return data;
  }
}
