import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import Note from './common/note';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createNote(@Body() note: Note) {
    return await this.appService.createNote(note);
  }

  @Get()
  async getNotes() {
    return await this.appService.getNotes();
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return await this.appService.deleteNote(id);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() note: Note) {
    note.id = id;
    return await this.appService.updateNote(note);
  }
}
