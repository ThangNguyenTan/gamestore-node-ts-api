import {
  findDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from '../../services/developer.service';
import db from '../../config/database.config';

describe('Developers Services', () => {
  let createdRecordID: number | undefined;

  beforeAll(async () => {
    await db.sync();
  });

  test(`Create Developer Function`, async () => {
    const developerData = {
      developerName: 'Samsung',
    };

    const newDeveloper = await createDeveloper(developerData);

    createdRecordID = newDeveloper?.getDataValue('id');

    expect(newDeveloper.getDataValue('developerName')).toEqual(developerData.developerName);
  });

  test(`Get All Developers Function`, async () => {
    const developers = await findDevelopers();

    expect(developers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          developerName: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Developer By Id Function`, async () => {
    const developer = await getDeveloper(createdRecordID!);

    expect(developer).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        developerName: expect.any(String),
      })
    );
  });

  test(`Update Developer Function`, async () => {
    const modifiedDeveloperData = {
      developerName: 'Sony',
    };
    const updatedDeveloper = await updateDeveloper(createdRecordID!, modifiedDeveloperData);

    expect(updatedDeveloper?.getDataValue('developerName')).toEqual(
      modifiedDeveloperData.developerName
    );
  });

  test(`Delete Developer Function`, async () => {
    const deletedDeveloper = await deleteDeveloper(createdRecordID!);

    expect(deletedDeveloper?.getDataValue('id')).toEqual(createdRecordID);
  });
});
