import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = []; // moives 객체를 담을 array

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id}`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id); // 해당 id를 가진 영화가 없으면 에러
    this.movies = this.movies.filter(movie => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
