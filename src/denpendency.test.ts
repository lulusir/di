import { DependencyGraph } from './dependencyGraph';
// import { injectable } from './injectable';

// class B {}

// @injectable()
// class A {
//   test(a: B) {}
//   constructor(public b: B, public b1: B) {}
// }
// it('getDependencies', () => {
//   const got = getDependencies(A);
//   expect(got.length).toBe(12);
// });

class A {}
class B {}
class C {}

describe('', () => {
  let dependencyGraph = new DependencyGraph();
  beforeEach(() => {
    dependencyGraph = new DependencyGraph();
  });
  it('add', () => {
    dependencyGraph.add(A, [B, C]);
    expect(dependencyGraph.graph.size).toBe(1);

    dependencyGraph.add(A, [A]);
    expect(dependencyGraph.graph.get(A)?.length).toBe(3);
  });

  it('hasLoop 0', () => {
    dependencyGraph.add(A, [B]);
    expect(dependencyGraph.hasLoop()).toBeFalsy();
  });

  it('hasLoop 1', () => {
    dependencyGraph.add(A, [A]);
    expect(dependencyGraph.hasLoop()).toBeTruthy();
  });

  it('hasLoop 2', () => {
    dependencyGraph.add(A, [B, A]);
    expect(dependencyGraph.hasLoop()).toBeTruthy();
  });

  it('hasLoop 3', () => {
    dependencyGraph.add(A, [B]);
    dependencyGraph.add(B, [A]);
    expect(dependencyGraph.hasLoop()).toBeTruthy();
  });

  it('hasLoop 4', () => {
    dependencyGraph.add(A, [B, C]);
    dependencyGraph.add(C, [A]);
    expect(dependencyGraph.hasLoop()).toBeTruthy();
  });

  it('hasLoop 4', () => {
    dependencyGraph.add(A, [B, C]);
    dependencyGraph.add(B, [C]);
    dependencyGraph.add(C, [C]);
    dependencyGraph.add(C, [A]);

    expect(dependencyGraph.hasLoop()).toBeTruthy();
  });
});
