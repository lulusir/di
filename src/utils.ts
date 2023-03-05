import { Constructor } from './interface';

export function isClass(cls: unknown): cls is Constructor {
  if (typeof cls === 'function') {
    if (/^\s*class\s+/.test(cls.toString())) {
      return true;
    }
  }
  return false;
}
