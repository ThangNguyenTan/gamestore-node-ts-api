import { FeatureInstance } from '../models';

const featureData = [
  {
    featureName: 'Single Player',
  },
  {
    featureName: 'Multiplayer',
  },
];

export const generateFeatures = async (): Promise<void> => {
  featureData.forEach(async (featureItem) => {
    await FeatureInstance.create(featureItem);
  });
};
