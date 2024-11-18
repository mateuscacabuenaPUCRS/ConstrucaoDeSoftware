import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { Handler } from 'aws-lambda';

const expressApp = express();
let cachedServer: any;

const bootstrapServer = async () => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Swagger Configuration
    const config = new DocumentBuilder()
      .setTitle("Construção de Software - T1")
      .setDescription("Documentação da Plataforma de Compra e Venda de Ingressos")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
};

export const handler: Handler = async (event, context) => {
//   const server = await bootstrapServer();
//   return proxy(server, event, context, 'PROMISE').promise;
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World Lambda!',
        }),
    }
};
