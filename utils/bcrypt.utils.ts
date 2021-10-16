import { compareSync, hashSync } from 'bcrypt';

export const encrypt = (plainString: string): string => {
  return hashSync(plainString, 10);
};

export const compare = (plainString: string, hashString: string): boolean => {
  return compareSync(plainString, hashString);
};
