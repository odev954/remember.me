import * as aws from 'aws-sdk';
import Note from 'src/common/note';
import { StatusCodes } from 'src/common/statusCodes';

export default async function createNote(
  database: aws.DynamoDB.DocumentClient,
  note: Note,
): Promise<StatusCodes> {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: note.id,
    },
    UpdateExpression: 'set content = :content, title = :title',
    ExpressionAttributeValues: {
      ':content': note.content,
      ':title': note.title,
    },
  };

  try {
    await database.update(params).promise();
    return StatusCodes.Success;
  } catch (error) {
    console.log('note update failed, aborted by db client. cause: ', error);
    return StatusCodes.Failure;
  }
}
