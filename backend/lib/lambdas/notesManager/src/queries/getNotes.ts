import * as aws from 'aws-sdk';
import Note from 'src/common/note';
import { Result } from 'src/common/result';
import { StatusCodes } from 'src/common/statusCodes';

export default async function getNotes(
  database: aws.DynamoDB.DocumentClient,
): Promise<Result<Note[]>> {
  const params = {
    TableName: process.env.NOTES_TABLE,
  };
  let notes: Note[] = [];

  try {
    const data = await database.scan(params).promise();
    notes = data.Items.map(
      (item) => aws.DynamoDB.Converter.unmarshall(item) as Note,
    );

    return { status: StatusCodes.Success, data: notes };
  } catch (error) {
    console.log('note selection failed, aborted by db client. cause: ', error);
    return { status: StatusCodes.Failure, data: notes };
  }
}
