import {
  findGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../../services/genre.service';
import db from '../../config/database.config';

describe('Genres Services', () => {
  let createdRecordID: number | undefined;

  beforeAll(async () => {
    await db.sync({
      logging: false,
    });
  });

  test(`Create Genre Function`, async () => {
    const genreData = {
      genreName: 'Horror',
    };

    const newGenre = await createGenre(genreData);

    createdRecordID = newGenre?.getDataValue('id');

    expect(newGenre.getDataValue('genreName')).toEqual(genreData.genreName);
  });

  test(`Get All Genres Function`, async () => {
    const genres = await findGenres();

    expect(genres).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          genreName: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Genre By Id Function`, async () => {
    const genre = await getGenre(createdRecordID!);

    expect(genre).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        genreName: expect.any(String),
      })
    );
  });

  test(`Update Genre Function`, async () => {
    const modifiedGenreData = {
      genreName: 'Action',
    };
    const updatedGenre = await updateGenre(createdRecordID!, modifiedGenreData);

    expect(updatedGenre?.getDataValue('genreName')).toEqual(modifiedGenreData.genreName);
  });

  test(`Delete Genre Function`, async () => {
    const deletedGenre = await deleteGenre(createdRecordID!);

    expect(deletedGenre?.getDataValue('id')).toEqual(createdRecordID);
  });
});
