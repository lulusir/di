export const InjectToken = Symbol('InjectToken');

export const inject =
  (token: string | symbol) =>
  (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    // 定义inject的 token
    // https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
    const metadata = Reflect.getOwnMetadata(InjectToken, target) || {};

    metadata[parameterIndex] = {
      token,
    };

    Reflect.defineMetadata(InjectToken, metadata, target);
  };
