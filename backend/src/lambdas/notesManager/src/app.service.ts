import { Injectable } from '@nestjs/common';
import Note from './common/note';
import * as queries from './queries';
import * as aws from 'aws-sdk';
import { Result } from './common/result';

@Injectable()
export class AppService {
  private database: aws.DynamoDB.DocumentClient;

  public constructor() {
    this.database = new aws.DynamoDB.DocumentClient();
  }

  async getNotes(): Promise<Result<Note[]>> {
    return queries.getNotes(this.database);
  }

  async createNote(note: Note): Promise<Result> {
    return queries.createNote(this.database, note);
  }

  async updateNote(note: Note): Promise<Result> {
    return queries.updateNote(this.database, note);
  }

  async deleteNote(noteId: string): Promise<Result> {
    return queries.deleteNote(this.database, noteId);
  }
}
