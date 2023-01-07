import {
	Duration,
	Stack,
	StackProps,
	Expiration,
	Construct,
} from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export default class AppStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);
        
        const notesTable = new dynamodb.Table(this, "NotesTable", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: "id",
                type: dynamodb.AttributeType.STRING,
            },
        });

		const notesManagerFunction = new lambda.Function(this, "NotesManager", {
			runtime: lambda.Runtime.NODEJS_16_X,
			handler: "main.handler",
			code: lambda.Code.fromAsset(
				path.join(__dirname, "lambdas/notesManager/src")
			),
		});

		const rest = new apigateway.RestApi(this, "NotesApi");
		
		notesTable.grantFullAccess(notesManagerFunction);
		notesManagerFunction.addEnvironment(
			"NOTES_TABLE",
			notesTable.tableName
		);

		rest.root.addMethod("ANY");

		const notes = rest.root.addResource("notes");

		notes.addMethod(
			"GET",
			new apigateway.LambdaIntegration(notesManagerFunction)
		);

		notes.addMethod(
			"PUT",
			new apigateway.LambdaIntegration(notesManagerFunction)
		);

		notes.addMethod(
			"POST",
			new apigateway.LambdaIntegration(notesManagerFunction)
		);

		notes.addMethod(
			"DELETE",
			new apigateway.LambdaIntegration(notesManagerFunction)
		);
	}
}
