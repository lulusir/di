/* eslint-disable max-classes-per-file */
import { container } from './container';
import { inject } from './inject';
import { injectable } from './injectable';
import { singleton } from './singleton';

describe(' container injectable', () => {
  it('default', () => {
    @injectable()
    class B {
      constructor() {}
    }

    const b1 = container.resolve(B);
    const b2 = container.resolve(B);

    expect(b1).not.toBe(b2);
  });
  it('1', () => {
    class A {}

    @injectable()
    class B {
      constructor(public a: A) {}
    }

    const b1 = container.resolve(B);
    expect(b1).toBeInstanceOf(B);
    expect(b1.a).toBeDefined();
  });

  it('multi params', () => {
    class A {}
    class C {
      name = 'test';
    }

    @injectable()
    class B {
      constructor(public a: A, public c: C) {}
    }

    const b1 = container.resolve(B);
    expect(b1).toBeInstanceOf(B);
    expect(b1.a).toBeDefined();
    expect(b1.c).toBeDefined();
    expect(b1.c.name).toBe('test');
  });

  it('Deep dependence', () => {
    class A {
      name = 'a';
    }

    @injectable()
    class B {
      name = 'b';

      constructor(public a: A) {}
    }

    @injectable()
    class C {
      name = 'c';

      constructor(public b: B, public a: A) {}
    }

    const c = container.resolve(C);
    expect(c?.b?.a?.name).toBe('a');
    expect(c.a.name).toBe('a');
  });
});

describe(' container singleton', () => {
  it('default', () => {
    @singleton()
    class B {
      constructor() {}
    }

    const b1 = container.resolve(B);
    const b2 = container.resolve(B);

    expect(b1).toEqual(b2);
  });
  it('1', () => {
    class A {}

    @singleton()
    class B {
      constructor(public a: A) {}
    }

    const b1 = container.resolve(B);
    const b2 = container.resolve(B);
    expect(b1).toEqual(b2);
    expect(b1).toBeInstanceOf(B);
    expect(b1.a).toBeDefined();
  });

  it('multi params', () => {
    class A {}
    class C {
      name = 'test';
    }

    @singleton()
    class B {
      constructor(public a: A, public c: C) {}
    }

    const b1 = container.resolve(B);
    const b2 = container.resolve(B);
    expect(b1).toEqual(b2);

    expect(b1).toBeInstanceOf(B);
    expect(b1.a).toBeDefined();
    expect(b1.c).toBeDefined();
    expect(b1.c.name).toBe('test');
  });

  it('Deep dependence', () => {
    class A {
      name = 'a';
    }

    @singleton()
    class B {
      name = 'b';

      constructor(public a: A) {}
    }

    @singleton()
    class C {
      name = 'c';

      constructor(public b: B, public a: A) {}
    }

    const c = container.resolve(C);
    const c1 = container.resolve(C);
    expect(c).toEqual(c1);
    expect(c?.b?.a?.name).toBe('a');
    expect(c.a.name).toBe('a');
  });
});

describe('register', () => {
  it('register', () => {
    class A {}

    const token = 'Service';
    container.register(token, { useClass: A });
    expect(container.__RegisterMap.get(token)).toBe(A);
  });

  it('inject', () => {
    const token = 'serviceB';
    interface B {}
    @injectable()
    class A {
      constructor(@inject(token) public b: B) {}

      _() {
        console.log(this.b);
      }
    }
    class B1 implements B {}

    container.register(token, { useClass: B1 });

    const a = container.resolve(A);
    expect(a.b).toBeDefined();
    expect(a.b).toBeInstanceOf(B1);
  });

  it('inject, symbol', () => {
    const token = Symbol('token');
    interface B {}
    @injectable()
    class A {
      constructor(@inject(token) public b: B) {}

      _() {
        console.log(this.b);
      }
    }
    class B1 implements B {}

    container.register(token, { useClass: B1 });

    const a = container.resolve(A);
    expect(a.b).toBeDefined();
    expect(a.b).toBeInstanceOf(B1);
  });

  it('inject1', () => {
    const token = 'serviceB';

    interface B {}
    class B1 implements B {
      name = 'b1';
    }
    class B2 implements B {
      name = 'b2';
    }
    @injectable()
    class A {
      constructor(public b1: B1, @inject(token) public b2: B) {}

      _() {
        console.log(this.b1);
        console.log(this.b2);
      }
    }

    container.register(token, { useClass: B2 });

    const a = container.resolve(A);
    expect(a.b1).toBeInstanceOf(B1);
    expect(a.b2).toBeInstanceOf(B2);
  });

  it('inject2', () => {
    const token = 'serviceB';

    interface B {}
    class B0 implements B {
      name = 'b0';
    }
    class B1 implements B {
      name = 'b1';
    }
    class B2 implements B {
      name = 'b2';
    }
    @injectable()
    class A {
      constructor(
        @inject(token) public b0: B0,
        public b1: B1,
        @inject(token) public b2: B,
      ) {}

      _() {
        console.log(this.b0);
        console.log(this.b1);
        console.log(this.b2);
      }
    }

    container.register(token, { useClass: B2 });

    const a = container.resolve(A);
    expect(a.b0).toBeInstanceOf(B2);
    expect(a.b1).toBeInstanceOf(B1);
    expect(a.b2).toBeInstanceOf(B2);
  });
});

describe('debug', () => {
  it('log', () => {
    class A {}
    container.debug('lujs');
    container.resolve(A);
  });
});
