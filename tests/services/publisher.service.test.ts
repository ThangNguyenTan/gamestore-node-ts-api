import {
  findPublishers,
  getPublisher,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '../../services/publisher.service';
import db from '../../config/database.config';

describe('Publishers Services', () => {
  let createdRecordID: number | undefined;

  beforeAll(async () => {
    await db.sync();
  });

  test(`Create Publisher Function`, async () => {
    const publisherData = {
      publisherName: 'Samsung',
    };

    const newPublisher = await createPublisher(publisherData);

    createdRecordID = newPublisher?.getDataValue('id');

    expect(newPublisher.getDataValue('publisherName')).toEqual(publisherData.publisherName);
  });

  test(`Get All Publishers Function`, async () => {
    const publishers = await findPublishers();

    expect(publishers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          publisherName: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Publisher By Id Function`, async () => {
    const publisher = await getPublisher(createdRecordID!);

    expect(publisher).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        publisherName: expect.any(String),
      })
    );
  });

  test(`Update Publisher Function`, async () => {
    const modifiedPublisherData = {
      publisherName: 'Sony',
    };
    const updatedPublisher = await updatePublisher(createdRecordID!, modifiedPublisherData);

    expect(updatedPublisher?.getDataValue('publisherName')).toEqual(
      modifiedPublisherData.publisherName
    );
  });

  test(`Delete Publisher Function`, async () => {
    const deletedPublisher = await deletePublisher(createdRecordID!);

    expect(deletedPublisher?.getDataValue('id')).toEqual(createdRecordID);
  });
});
