import { injectable } from './injectable';
import { Constructor } from './interface';

export const singletonMarks = new Map<Constructor<any>, boolean>();
export const singletonMap = new Map<Constructor<any>, any>();

export const singleton =
  <T>() =>
  (target: Constructor<T>) => {
    injectable()(target);
    singletonMarks.set(target, true);
  };
