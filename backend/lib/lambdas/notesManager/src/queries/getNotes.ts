import * as aws from 'aws-sdk';
import Note from '../common/note';
import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export default async function getNotes(
  database: DynamoDBDocumentClient,
): Promise<Result<Note[]>> {
  const params = {
    TableName: process.env.NOTES_TABLE,
  };

  try {
    const data = await database.send(new ScanCommand(params));

    console.info(`DB SCAN NOTES: ${JSON.stringify(data.Items, null, 2)}`);

    return { status: StatusCodes.Success, data: data.Items as Note[] };
  } catch (error) {
    console.log('note selection failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
