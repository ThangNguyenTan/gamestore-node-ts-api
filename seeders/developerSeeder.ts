import { DeveloperInstance } from '../models';

const developerData = [
  {
    developerName: 'Square Enix',
  },
  {
    developerName: 'Visual Concepts',
  },
  {
    developerName: 'Ubisoft',
  },
  {
    developerName: 'Rockstar Games',
  },
];

export const generateDevelopers = async (): Promise<void> => {
  developerData.forEach(async (developerItem) => {
    await DeveloperInstance.create(developerItem);
  });
};
