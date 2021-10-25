import { DeveloperInstance, DeveloperAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const getAllDevelopers = async (): Promise<DeveloperInstance[]> => {
  const developers = await DeveloperInstance.findAll();

  return developers;
};

export const findDevelopers = async (
  options?: FindOptions<DeveloperAttributes>
): Promise<DeveloperInstance[]> => {
  const developers = await DeveloperInstance.findAll(options);

  return developers;
};

export const getDeveloper = async (id: number): Promise<DeveloperInstance | null> => {
  const developer = await DeveloperInstance.findOne({ where: { id } });

  return developer;
};

export const createDeveloper = async (
  newDeveloper: DeveloperAttributes
): Promise<DeveloperInstance> => {
  const { developerName } = newDeveloper;
  const createdDeveloper = await DeveloperInstance.create({
    developerName,
  });

  return createdDeveloper;
};

export const updateDeveloper = async (
  id: number,
  modifiedDeveloper: DeveloperAttributes
): Promise<DeveloperInstance | null> => {
  let developer = await getDeveloper(id);
  const { developerName } = modifiedDeveloper;

  if (!developer) {
    return null;
  }

  developer = await developer.update({
    developerName,
  });

  return developer;
};

export const deleteDeveloper = async (id: number): Promise<DeveloperInstance | null> => {
  const developer = await getDeveloper(id);

  if (!developer) {
    return null;
  }

  await developer.destroy();

  return developer;
};
