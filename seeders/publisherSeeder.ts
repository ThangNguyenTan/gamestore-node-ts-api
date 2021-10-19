import { PublisherInstance } from '../models';

const publisherData = [
  {
    publisherName: 'Square Enix',
  },
  {
    publisherName: '2K',
  },
  {
    publisherName: 'Ubisoft',
  },
  {
    publisherName: 'Rockstar Games',
  },
];

export const generatePublishers = async (): Promise<void> => {
  publisherData.forEach(async (publisherItem) => {
    await PublisherInstance.create(publisherItem);
  });
};
