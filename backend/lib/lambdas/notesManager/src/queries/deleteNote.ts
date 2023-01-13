import * as aws from 'aws-sdk';
import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';

export default async function deleteNote(
  database: aws.DynamoDB.DocumentClient,
  noteId: string,
): Promise<Result> {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: noteId,
    },
  };

  try {
    await database.delete(params).promise();
    return { status: StatusCodes.Success };
  } catch (error) {
    console.log('note deletion failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
