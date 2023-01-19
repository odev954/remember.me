import * as aws from 'aws-sdk';
import Note from '../common/note';
import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export default async function updateNote(
  database: DynamoDBDocumentClient,
  note: Note,
): Promise<Result> {
  note.updated_at = Math.floor(Date.now() / 1000); //set time to unix epoch
  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: note,
  };

  try {
    const result = await database.send(new PutCommand(params));

    console.info(`DB UPDATE STATUS: ${result.$metadata.httpStatusCode}`);

    return { status: StatusCodes.Success };
  } catch (error) {
    console.log('note update failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
