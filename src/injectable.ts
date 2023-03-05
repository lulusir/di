import { Constructor, ParamType } from './interface';

export const paramTypesMap = new Map<Constructor<any>, ParamType[]>();

export const injectable =
  <T>() =>
  (target: Constructor<T>) => {
    const paramTypes = (Reflect.getMetadata('design:paramtypes', target) ||
      []) as any[];
    if (paramTypes.indexOf(undefined) !== -1) {
      console.warn(`
class ${target.name} may be a circular dependency
please use lazy inject:

@injectable()
export class CircleA {
  constructor(public b: () => CircleB) {}
}`);
    }
    paramTypesMap.set(target, paramTypes);
  };
