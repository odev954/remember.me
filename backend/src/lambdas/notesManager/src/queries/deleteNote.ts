import * as aws from 'aws-sdk';
import { StatusCodes } from 'src/common/statusCodes';

export default async function deleteNote(
  database: aws.DynamoDB.DocumentClient,
  noteId: string,
): Promise<StatusCodes> {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: noteId,
    },
  };

  try {
    await database.delete(params).promise();
    return StatusCodes.Success;
  } catch (error) {
    console.log('note deletion failed, aborted by db client. cause: ', error);
    return StatusCodes.Failure;
  }
}
