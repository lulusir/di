import { delay, inject } from '../inject';
import { injectable } from '../injectable';
import { Bar, CircleB } from './circleB';

// interface IB {}
// a 依赖b
// b依赖a
// 这样就循环依赖了。

// 可以在中间创建一个代理对象，初始化的时候注入代理对象
// 调用方式时，比如这个过程a.b.some()
// 这时候再初始化b对象，同时注入a对象
// 设置代理对象的代理为b

@injectable()
export class CircleA {
  name = 'A';
  constructor(@inject(delay(() => CircleB)) public b: CircleB) {}
}

// @injectable()
// export class CircleC {
//   constructor(public b: () => CircleB) {}
// }
@injectable()
export class Foo {
  constructor(@inject(delay(() => Bar)) public b: Bar) {}
}
