import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Express } from 'express';
import * as express from 'express';
import { createServer } from 'aws-serverless-express';
import { IBootstrapper } from './abstract/IBootstrapper';
import { Server } from 'http';

export class NestBootstrapper implements IBootstrapper {
  private cachedServer: Server;

  private async createExpressApp(
    expressApp: Express,
  ): Promise<INestApplication> {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    return app;
  }

  public async bootstrap(): Promise<Server> {
    if (!this.cachedServer) {
      const expressApp = express();
      const app = await this.createExpressApp(expressApp);
      await app.init();
      this.cachedServer = createServer(expressApp);
    }
    return this.cachedServer;
  }
}
