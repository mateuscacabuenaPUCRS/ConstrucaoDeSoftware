import { writeFileSync } from 'fs';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express from 'express';
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from '@nestjs/platform-express';
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

  writeFileSync('swagger.json', JSON.stringify(document, null, 2), { encoding: 'utf-8' });

  await app.listen(8000);
}
// bootstrap();

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: unknown = {}): Promise<APIGatewayProxyResult> => {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  const {
    path,
    httpMethod,
    headers,
    body,
    queryStringParameters,
  } = event;

  const mockRequest = {
    method: httpMethod,
    url: path,
    headers,
    body,
    query: queryStringParameters,
  };

  return new Promise<APIGatewayProxyResult>((resolve, reject) => {
    const mockResponse = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader(name: string, value: string) {
        this.headers[name] = value;
      },
      getHeader(name: string) {
        return this.headers[name];
      },
      end(body: string) {
        // Finalizes the HTTP response
        this.body = body;
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
      },
    };

    server(mockRequest as any, mockResponse as any, (err: any) => {
      if (err) {
        reject(err);
      }
    });
  });
}
