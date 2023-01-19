import { Result } from '../common/result';
import { StatusCodes } from '../common/statusCodes';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export default async function deleteNote(
  database: DynamoDBDocumentClient,
  noteId: string,
): Promise<Result> {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: noteId,
    },
  };

  try {
    const result = await database.send(new DeleteCommand(params));

    console.info(`DB DELETE STATUS: ${result.$metadata.httpStatusCode}`);

    return { status: StatusCodes.Success };
  } catch (error) {
    console.log('note deletion failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure };
  }
}
