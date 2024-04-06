import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @MessagePattern('createDevice')
  create(@Payload() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @MessagePattern('findAllDevice')
  findAll() {
    return this.deviceService.findAll();
  }

  @MessagePattern('findOneDevice')
  findOne(@Payload() id: number) {
    return this.deviceService.findOne(id);
  }

  @MessagePattern('updateDevice')
  update(@Payload() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(updateDeviceDto.id, updateDeviceDto);
  }

  @MessagePattern('removeDevice')
  remove(@Payload() id: number) {
    return this.deviceService.remove(id);
  }
}
