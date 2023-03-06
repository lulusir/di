import { delay, inject } from '../inject';
import { injectable } from '../injectable';
import { Foo, CircleA } from './circleA';

@injectable()
export class CircleB {
  name = 'b';
  constructor(@inject(delay(() => CircleA)) public a: CircleA) {}
}

@injectable()
export class Baz {
  constructor(@inject(delay(() => Foo)) public b: Foo) {}
}

@injectable()
export class Bar {
  constructor(@inject(delay(() => Baz)) public b: Baz) {}
}
