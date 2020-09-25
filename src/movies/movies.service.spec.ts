import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeAll(() => console.log('start Test! intialize DB'));

  // 각 테스트 마다 실행 됨
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();
    service = module.get<MoviesService>(MoviesService);
  });

  // 각각의 유닛 테스팅은 it로 진행
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll testing', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne testing', () => {
    it('should return a movie', () => {
      // 뭐라도 가져오려면 적어도 1개는 있어야 하니 만들어 줌
      service.create({
        title: 'dummy Movie',
        year: 2020,
        genres: ['thriller', 'SF'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(100000000);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with ID NotFound: 100000000');
      }
    });
  });

  describe('deleteOne testing', () => {
    it('delete a movie', () => {
      service.create({
        title: 'dummy Movie',
        year: 2020,
        genres: ['thriller', 'SF'],
      });
      const beforeMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeMovies);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(10000);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create testing', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'dummy Movie',
        year: 2020,
        genres: ['thriller', 'SF'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update testing', () => {
    it('should update a moive', () => {
      service.create({
        title: 'dummy Movie',
        year: 2020,
        genres: ['thriller', 'SF'],
      });
      service.update(1, { title: 'updated Movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated Movie');
    });

    it('should return a 404', () => {
      try {
        service.update(10000, { title: 'updated Movie' });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  afterAll(() => console.log('end test! need to clear DB'));
});
