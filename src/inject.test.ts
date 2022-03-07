/* eslint-disable max-classes-per-file */
import { inject, InjectToken } from './inject';
import 'reflect-metadata';

describe('inject', () => {
  it('inject', () => {
    interface B {}
    class A {
      constructor(@inject('serviceB') private b: B) {}

      _() {
        console.log(this.b);
      }
    }

    const tokenMap = Reflect.getOwnMetadata(InjectToken, A);
    expect(tokenMap[0].token).toBe('serviceB');
  });

  it('inject, symbol token', () => {
    const token = Symbol('token');
    interface B {}
    class A {
      constructor(@inject(token) private b: B) {}

      _() {
        console.log(this.b);
      }
    }

    const tokenMap = Reflect.getOwnMetadata(InjectToken, A);
    expect(tokenMap[0].token).toBe(token);
  });

  it('inject1', () => {
    interface B {}
    class A {
      constructor(private b1: B, @inject('serviceB') private b: B) {}

      _() {
        console.log(this.b);
        console.log(this.b1);
      }
    }

    const tokenMap = Reflect.getOwnMetadata(InjectToken, A);
    expect(tokenMap[1].token).toBe('serviceB');
  });

  it('inject1', () => {
    interface B {}
    class A {
      constructor(
        @inject('serviceB') private b0: B,
        private b1: B,
        @inject('serviceB') private b2: B,
      ) {}

      _() {
        console.log(this.b0);
        console.log(this.b1);
        console.log(this.b2);
      }
    }

    const tokenMap = Reflect.getOwnMetadata(InjectToken, A);
    expect(tokenMap[0].token).toBe('serviceB');
    expect(tokenMap[2].token).toBe('serviceB');
  });
});
