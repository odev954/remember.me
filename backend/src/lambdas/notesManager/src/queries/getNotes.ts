import * as aws from 'aws-sdk';
import { StatusCodes } from 'src/common/statusCodes';

export default async function getNotes(
  database: aws.DynamoDB.DocumentClient,
): Promise<StatusCodes> {
  const params = {
    TableName: process.env.NOTES_TABLE,
  };

  try {
    await database.scan(params).promise();
    return StatusCodes.Success;
  } catch (error) {
    console.log('note selection failed, aborted by db client. cause: ', error);
    return StatusCodes.Failure;
  }
}
