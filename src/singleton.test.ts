import { paramTypesMap } from './injectable';
import { singleton, singletonMap, singletonMarks } from './singleton';

describe('singleton', () => {
  it('mark', () => {
    @singleton()
    class A {}

    expect(paramTypesMap.get(A)?.length).toBe(0);
    expect(singletonMarks.get(A)).toBe(true);
    expect(singletonMap.get(A)).toBe(undefined);
  });
});
