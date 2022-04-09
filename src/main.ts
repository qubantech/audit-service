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

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:6868',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
