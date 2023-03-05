import { delay, inject } from '../inject';
import { injectable } from '../injectable';
import { CircleA } from './circleA';

@injectable()
export class CircleB {
  name = 'b';
  constructor(@inject(delay(() => CircleA)) public a: CircleA) {}
}
