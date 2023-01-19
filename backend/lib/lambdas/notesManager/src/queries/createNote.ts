import Note from '../common/note';
import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';
import { v4 as uuid } from 'uuid';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export default async function createNote(
  database: DynamoDBDocumentClient,
  note: Note,
): Promise<Result> {
  note.id = uuid();
  note.created_at = Math.floor(Date.now() / 1000); //set time to unix epoch
  note.updated_at = note.created_at;
  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: note,
  };

  try {
    const result = await database.send(new PutCommand(params));

    console.info(`DB CREATE STATUS: ${result.$metadata.httpStatusCode}`);

    return { status: StatusCodes.Success };
  } catch (error) {
    console.log('note creation failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
