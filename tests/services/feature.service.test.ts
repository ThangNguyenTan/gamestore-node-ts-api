import {
  findFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature,
} from '../../services/feature.service';
import db from '../../config/database.config';

describe('Features Services', () => {
  let createdRecordID: number | undefined;

  beforeAll(async () => {
    await db.sync();
  });

  test(`Create Feature Function`, async () => {
    const featureData = {
      featureName: 'Horror',
    };

    const newFeature = await createFeature(featureData);

    createdRecordID = newFeature?.getDataValue('id');

    expect(newFeature.getDataValue('featureName')).toEqual(featureData.featureName);
  });

  test(`Get All Features Function`, async () => {
    const features = await findFeatures();

    expect(features).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          featureName: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Feature By Id Function`, async () => {
    const feature = await getFeature(createdRecordID!);

    expect(feature).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        featureName: expect.any(String),
      })
    );
  });

  test(`Update Feature Function`, async () => {
    const modifiedFeatureData = {
      featureName: 'Action',
    };
    const updatedFeature = await updateFeature(createdRecordID!, modifiedFeatureData);

    expect(updatedFeature?.getDataValue('featureName')).toEqual(modifiedFeatureData.featureName);
  });

  test(`Delete Feature Function`, async () => {
    const deletedFeature = await deleteFeature(createdRecordID!);

    expect(deletedFeature?.getDataValue('id')).toEqual(createdRecordID);
  });
});
