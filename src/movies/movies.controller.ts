import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'this will return all movies';
  }

  @Get('/search')
  search(@Query('year') searchingYear: number) {
    return `We are Searching made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string): string {
    return `this will return one movie, id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie id: ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
