import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appMqtt = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        subscribeOptions: { qos: 1 },
        url: 'mqtt://localhost:1883',
      },
    },
  );

  const options = new DocumentBuilder()
    .setTitle('SmartGlobalManufacturing')
    .setDescription('SmartGlobalManufacturing')
    .setVersion('1.0')
    .addTag('entity1')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(3000);
  await appMqtt.listen();
}

bootstrap();
