import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

import { ExceptionsFilter } from "./common/filters/http-exception.filter";
import { AppModule } from "./app.module";
import { AppLogger } from "./common/utils/logger";
import config from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });

  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("API")
    .setDescription("API documentation")
    .setVersion("0.0.2")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  await app.listen(config.PORT);
  console.log(config.PORT);
}
bootstrap();
