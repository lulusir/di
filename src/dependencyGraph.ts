/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import { Constructor } from './interface';

/**
 * todo
 * 构建一个依赖图
 * - 插入图，每个节点为一个类
 * - 判断是否有循环依赖
 * - 判断当前类是否有循环依赖，并给出提示
 */
export class DependencyGraph {
  /**
   * a -> b, c, ...
   * b -> c ,d, a ...
   */
  graph: Map<Constructor, Constructor[]> = new Map();

  add(from: Constructor, to: Constructor[]) {
    let t = this.graph.get(from);
    if (t) {
      t = [...t, ...to];
      this.graph.set(from, t);
    } else {
      this.graph.set(from, to);
    }
  }

  private _visited = new Map<Constructor, boolean>();

  private _path = new Map<Constructor, boolean>();

  private _pathStack: Constructor[] = [];

  private _hasLoop = false;

  /**
   * 判断图是否有循环，并打印出循环路径
   * 如 a -> b -> c -> a
   */
  hasLoop() {
    this._hasLoop = false;

    const to = this.graph.keys();

    for (const t of to) {
      this.traverse(t);
    }

    this._visited = new Map<Constructor, boolean>();
    this._path = new Map<Constructor, boolean>();
    this._pathStack = [];

    if (this._hasLoop) {
      console.warn(
        `Has Circular dependencies:
${this._pathStack.join(' -> ').toString()}`,
      );
      console.warn(`
please use lazy inject，For example：

@injectable()
export class CircleA {
  constructor(@inject(delay(() => CircleB)) public b: CircleB) {}
}

@injectable()
export class CircleB {
  constructor(@inject(delay(() => CircleA)) public a: CircleA) {}
}
`);
    }

    return this._hasLoop;
  }

  private traverse(v: Constructor) {
    this._pathStack.push(v);

    if (this._path.get(v)) {
      this._hasLoop = true;
    }

    if (this._visited.get(v) || this._hasLoop) {
      return;
    }
    this._visited.set(v, true);
    this._path.set(v, true);
    const to = this.graph.get(v);
    to?.forEach((t) => {
      this.traverse(t);
    });
    this._path.set(v, false);
    // this._pathStack.pop();
  }
}

export const dependencyGraph = new DependencyGraph();
