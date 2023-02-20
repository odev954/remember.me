import { Context } from 'aws-lambda';
import { proxy, Response } from 'aws-serverless-express';
import { NestBootstrapper } from './bootstrapper';

export async function handler(event: any, context: Context): Promise<Response> {
  const bootstrapper = new NestBootstrapper();
  const server = await bootstrapper.bootstrap();
  return proxy(server, event, context, 'PROMISE').promise;
}
