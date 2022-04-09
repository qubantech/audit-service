import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.NODE_DOCKER_PORT || 8080;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Audit service')
    .setDescription('API Docs')
    .setVersion('1.0.0')
    .addTag('qubantech')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const whitelist = [
    'localhost',
    'http://localhost',
    'http://localhost:3000',
    '192.168.122.1',
    '192.168.122.1:3000',
    '192.168.221.205',
    '192.168.221.205:3000',
    'http://192.168.122.1',
    'http://192.168.122.1:3000',
    'http://192.168.221.205',
    'http://192.168.221.205:3000',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(origin));
      }
    },
  });

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
