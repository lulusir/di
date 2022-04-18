/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import { InjectToken } from './inject';
import { paramTypesMap } from './injectable';
import { Constructor } from './interface';
import { singletonMap, singletonMarks } from './singleton';

class Container {
  static _instance: Container;

  private __debug = false;

  __RegisterMap = new Map<string | Symbol, any>();

  static singleton() {
    if (!Container._instance) {
      Container._instance = new Container();
    }
    return Container._instance;
  }

  resolve<T>(Cls: Constructor<T>): T {
    if (this.__debug) {
      singletonMarks.forEach((value, key) => {
        console.log('------singletonMarks');
        console.log(`${key} = ${value}`);
        console.log('------singletonMarks');
      });

      singletonMap.forEach((value, key) => {
        console.log('------singletonMap');
        console.log(`${key} = ${value}`);
        console.log('------singletonMap');
      });

      paramTypesMap.forEach((value, key) => {
        console.log('------paramTypesMap');
        console.log(`${key} = ${value}`);
        console.log('------paramTypesMap');
      });

      this.__RegisterMap.forEach((value, key) => {
        console.log('------__RegisterMap');
        console.log(`${key.toString()} = ${value}`);
        console.log('------__RegisterMap');
      });
    }
    const isSingleton = singletonMarks.get(Cls);

    if (isSingleton) {
      const singleton = singletonMap.get(Cls);
      if (singleton) {
        return singleton;
      }
    }

    const paramTypes = paramTypesMap.get(Cls);
    if (Array.isArray(paramTypes) && paramTypes.length) {
      const injectTokens = Reflect.getMetadata(InjectToken, Cls);

      // 替换 使用inject装饰器描述的 参数
      if (injectTokens) {
        if (this.__debug) {
          console.log(injectTokens, paramTypes, 'injectTokens');
        }

        Object.keys(injectTokens).forEach((index) => {
          const { token } = injectTokens[index];
          paramTypes[+index] = this.__RegisterMap.get(token);
        });
      }

      const params = paramTypes.map((depCls) =>
        this.resolve<typeof depCls>(depCls),
      );

      const c = new Cls(...params);
      if (isSingleton) {
        singletonMap.set(Cls, c);
      }
      return c;
    }

    const c = new Cls();
    if (isSingleton) {
      singletonMap.set(Cls, c);
    }
    return c;
  }

  /**
   * 注册自定义 的类
   * @param token
   * @param options
   */
  register(token: string | Symbol, options: { useClass: Constructor<any> }) {
    if (options.useClass) {
      this.__RegisterMap.set(token, options.useClass);
    }
  }

  debug(name: string) {
    if (name === 'lujs') {
      this.__debug = true;
    }
  }
}

export const container = Container.singleton();
