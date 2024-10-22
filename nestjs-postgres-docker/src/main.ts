import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DataSource } from "typeorm";
import { AppModule } from "./app.module";
import { truncateAllTables } from './database/clear';
import { seedDatabase } from './database/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve the DataSource instance from the application context
  const dataSource = app.get(DataSource);

  // // Truncate the database
  // await truncateAllTables(dataSource);

  // Seed the database
  await seedDatabase(dataSource);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("Construção de Software - T1")
    .setDescription("Documentação da Plataforma de Compra e Venda de Ingressos")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
