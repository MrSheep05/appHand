import {Fingers} from './state.types';

export const capitilize = (text: string): string => {
  const [firsLetter, ...rest] = text;
  return firsLetter.toUpperCase() + rest.join('');
};

export const normalizePosition = (position: Fingers): Fingers => {
  return Object.keys(position).reduce<Fingers>((prev, value) => {
    return {...prev, [value]: position[value as keyof Fingers] / 180};
  }, {} as Fingers);
};
