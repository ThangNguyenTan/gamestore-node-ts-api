import { GenreInstance } from '../models';

const genreData = [
  {
    genreName: 'Horror',
  },
  {
    genreName: 'Action',
  },
  {
    genreName: 'Adventure',
  },
  {
    genreName: 'RPG',
  },
  {
    genreName: 'Sports',
  },
];

export const generateGenres = async (): Promise<void> => {
  genreData.forEach(async (genreItem) => {
    await GenreInstance.create(genreItem);
  });
};
