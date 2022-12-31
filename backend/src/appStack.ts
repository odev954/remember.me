import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const notesManagerFunction = new lambda.Function(this, 'NotesManager', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
        });
        
        const api = new apigateway.RestApi(this, 'NotesApi');
        
        api.root.addMethod('ANY');

        const notes = api.root.addResource('notes');

        notes.addMethod('GET', new apigateway.LambdaIntegration(notesManagerFunction));
    }
}
