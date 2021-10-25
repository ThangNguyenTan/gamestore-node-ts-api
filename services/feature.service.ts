import { FeatureInstance, FeatureAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const getAllFeatures = async (): Promise<FeatureInstance[]> => {
  const features = await FeatureInstance.findAll();

  return features;
};

export const findFeatures = async (
  options?: FindOptions<FeatureAttributes>
): Promise<FeatureInstance[]> => {
  const features = await FeatureInstance.findAll(options);

  return features;
};

export const getFeature = async (id: number): Promise<FeatureInstance | null> => {
  const feature = await FeatureInstance.findOne({ where: { id } });

  return feature;
};

export const createFeature = async (newFeature: FeatureAttributes): Promise<FeatureInstance> => {
  const { featureName } = newFeature;
  const createdFeature = await FeatureInstance.create({
    featureName,
  });

  return createdFeature;
};

export const updateFeature = async (
  id: number,
  modifiedFeature: FeatureAttributes
): Promise<FeatureInstance | null> => {
  let feature = await getFeature(id);
  const { featureName } = modifiedFeature;

  if (!feature) {
    return null;
  }

  feature = await feature.update({
    featureName,
  });

  return feature;
};

export const deleteFeature = async (id: number): Promise<FeatureInstance | null> => {
  const feature = await getFeature(id);

  if (!feature) {
    return null;
  }

  await feature.destroy();

  return feature;
};
