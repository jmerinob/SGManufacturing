import { Controller, Get } from '@nestjs/common';
//import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@MessagePattern('ftf-input')
  sumData(@Payload() payload: number[], @Ctx() context: MqttContext) {
    console.log(`---NEW Message ${context.getTopic()}---`);
    console.log('Payload: ', payload);
    console.log('Packet: ', context.getPacket());
    this.appService.sumDataService(payload);
  }

  @MessagePattern('ftf-output')
  logData(@Payload() payload: string, @Ctx() context: MqttContext): string {
    console.log(`---NEW Message ${context.getTopic()}---`);
    console.log('Payload: ', payload);
    console.log('Packet: ', context.getPacket());
    return payload + ` response from logData() in -t ${context.getTopic()}`;
  }*/
}
