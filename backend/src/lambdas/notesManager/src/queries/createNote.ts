import * as aws from 'aws-sdk';
import Note from 'src/common/note';
import { StatusCodes } from 'src/common/statusCodes';

export default async function createNote(
  database: aws.DynamoDB.DocumentClient,
  note: Note,
): Promise<StatusCodes> {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: note,
  };

  try {
    await database.put(params).promise();
    return StatusCodes.Success;
  } catch (error) {
    console.log('note creation failed, aborted by db client. cause: ', error);
    return StatusCodes.Failure;
  }
}
