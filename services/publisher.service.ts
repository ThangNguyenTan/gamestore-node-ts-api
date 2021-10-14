import { PublisherInstance, PublisherAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const findPublishers = async (
  options?: FindOptions<PublisherAttributes>
): Promise<PublisherInstance[]> => {
  const publishers = await PublisherInstance.findAll(options);

  return publishers;
};

export const getPublisher = async (id: number): Promise<PublisherInstance | null> => {
  const publisher = await PublisherInstance.findOne({ where: { id } });

  return publisher;
};

export const createPublisher = async (
  newPublisher: PublisherAttributes
): Promise<PublisherInstance> => {
  const { publisherName } = newPublisher;
  const createdPublisher = await PublisherInstance.create({
    publisherName,
  });

  return createdPublisher;
};

export const updatePublisher = async (
  id: number,
  modifiedPublisher: PublisherAttributes
): Promise<PublisherInstance | null> => {
  let publisher = await getPublisher(id);
  const { publisherName } = modifiedPublisher;

  if (!publisher) {
    return null;
  }

  publisher = await publisher.update({
    publisherName,
  });

  return publisher;
};

export const deletePublisher = async (id: number): Promise<PublisherInstance | null> => {
  const publisher = await getPublisher(id);

  if (!publisher) {
    return null;
  }

  await publisher.destroy();

  return publisher;
};
