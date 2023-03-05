/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// Eager Initialization: cache all ，just like spring
// Lazy Initialization: Proxy or factory
// Manual Dependency Injection: Setter
import { container } from './container';
import { Constructor } from './interface';

type DelayFn = () => Constructor;

export const InjectToken = Symbol('InjectToken');

/**
 * DelayFactory
 * it will create proxy object by delay create function

 * such as Foo -> Bar , Bar -> Foo
 * 0. create Foo
 * 1. if Bar is delay ,create Proxy Bar, delay create Bar
 * 2. inject Proxy Bar to Foo
 * 4. if need create Bar, if Foo is delay ,create Proxy Foo, delay create Foo
 */
export class DelayFactory {
  private reflectMethods: ReadonlyArray<keyof ProxyHandler<any>> = [
    'get',
    'getPrototypeOf',
    'setPrototypeOf',
    'getOwnPropertyDescriptor',
    'defineProperty',
    'has',
    'set',
    'deleteProperty',
    'apply',
    'construct',
    'ownKeys',
  ];

  constructor(public delayFn: DelayFn) {}

  _target: any = null;

  get target() {
    if (this._target === null) {
      this._target = container.resolve(this.delayFn());
    }
    return this._target;
  }

  createProxy() {
    const handler: ProxyHandler<object> = {};
    const install = (name: keyof ProxyHandler<any>): void => {
      handler[name] = (...args: any[]) => {
        args[0] = this.target;
        const method = Reflect[name];
        return (method as any)(...args);
      };
    };
    this.reflectMethods.forEach(install);

    return new Proxy<any>({} as any, handler);
  }
}

type ITokenType = string | symbol | DelayFactory;

export const inject =
  (token: ITokenType) =>
  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    // 定义inject的 token
    // https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
    const metadata = Reflect.getOwnMetadata(InjectToken, target) || {};

    metadata[parameterIndex] = {
      token,
    };
    // console.log(parameterIndex, token, '=========s');
    Reflect.defineMetadata(InjectToken, metadata, target);
    // todo 判断是否有循环依赖，给出提示
  };

export const delay = (delayFn: DelayFn) => new DelayFactory(delayFn);
