import { Injectable } from '@nestjs/common';
import Note from './common/note';
import * as queries from './queries';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Result } from './common/result';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Injectable()
export class AppService {
  private database: DynamoDBClient;

  public constructor() {
    this.database = new DynamoDBClient({});
  }

  async getNotes(): Promise<Result<Note[]>> {
    console.info(`GET NOTES`);
    return queries.getNotes(DynamoDBDocumentClient.from(this.database));
  }

  async createNote(note: Note): Promise<Result> {
    console.info(`CREATE NOTE: ${JSON.stringify(note, null, 2)}`);
    return queries.createNote(DynamoDBDocumentClient.from(this.database), note);
  }

  async updateNote(note: Note): Promise<Result> {
    console.info(`UPDATE NOTE: ${JSON.stringify(note, null, 2)}`);
    return queries.updateNote(DynamoDBDocumentClient.from(this.database), note);
  }

  async deleteNote(noteId: string): Promise<Result> {
    console.info(`DELETE NOTE: ${noteId}`);
    return queries.deleteNote(
      DynamoDBDocumentClient.from(this.database),
      noteId,
    );
  }
}
