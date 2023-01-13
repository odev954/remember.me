import * as aws from 'aws-sdk';
import Note from '../common/note';
import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';
import { v4 as uuid } from 'uuid';

export default async function createNote(
  database: aws.DynamoDB.DocumentClient,
  note: Note,
): Promise<Result> {
  note.id = uuid();
  note.created_at = Math.floor(Date.now() / 1000); //set time to unix epoch
  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: note,
  };

  try {
    await database.put(params).promise();
    return { status: StatusCodes.Success };
  } catch (error) {
    console.log('note creation failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
