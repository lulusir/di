import { Constructor, ParamType } from './interface';

export const paramTypesMap = new Map<Constructor<any>, ParamType[]>();

export const injectable =
  <T>() =>
  (target: Constructor<T>) => {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    paramTypesMap.set(target, paramTypes);
  };
