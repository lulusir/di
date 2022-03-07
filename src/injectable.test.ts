/* eslint-disable max-classes-per-file */
import { injectable, paramTypesMap } from './injectable';

describe('injectable', () => {
  it('default', () => {
    @injectable()
    class A {}

    expect(paramTypesMap.get(A)?.length).toBe(0);
  });

  it('one', () => {
    class B {}

    @injectable()
    class A {
      constructor(b: B) {}
    }

    const paramTypes = paramTypesMap.get(A);

    if (paramTypes !== undefined) {
      expect(paramTypes.length).toBe(1);

      expect(paramTypes[0]).toEqual(B);
    }
  });

  it('two', () => {
    class B {}
    class C {}

    @injectable()
    class A {
      constructor(b: B, c: C) {}
    }

    const paramTypes = paramTypesMap.get(A);

    if (paramTypes !== undefined) {
      expect(paramTypes.length).toBe(2);

      expect(paramTypes[0]).toEqual(B);
      expect(paramTypes[1]).toEqual(C);
    }
  });
});
