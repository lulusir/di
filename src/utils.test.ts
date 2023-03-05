import { isClass } from './utils';

function A() {}
class B {}

it('isClass: true', () => {
  expect(isClass(B)).toBeTruthy();
});

it('isClass: false', () => {
  const a = '';
  expect(isClass(a)).toBeFalsy();
  expect(isClass(A)).toBeFalsy();
});
