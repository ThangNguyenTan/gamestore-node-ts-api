import { GenreInstance, GenreAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const findGenres = async (
  options?: FindOptions<GenreAttributes>
): Promise<GenreInstance[]> => {
  const genres = await GenreInstance.findAll(options);

  return genres;
};

export const getGenre = async (id: number): Promise<GenreInstance | null> => {
  const genre = await GenreInstance.findOne({ where: { id } });

  return genre;
};

export const createGenre = async (newGenre: GenreAttributes): Promise<GenreInstance> => {
  const { genreName } = newGenre;
  const createdGenre = await GenreInstance.create({
    genreName,
  });

  return createdGenre;
};

export const updateGenre = async (
  id: number,
  modifiedGenre: GenreAttributes
): Promise<GenreInstance | null> => {
  let genre = await getGenre(id);
  const { genreName } = modifiedGenre;

  if (!genre) {
    return null;
  }

  genre = await genre.update({
    genreName,
  });

  return genre;
};

export const deleteGenre = async (id: number): Promise<GenreInstance | null> => {
  const genre = await getGenre(id);

  if (!genre) {
    return null;
  }

  await genre.destroy();

  return genre;
};
