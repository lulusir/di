The interface refers to [TSyringe](https://github.com/Microsoft/tsyringe)

## install
```bash
npm install @lujs/di
```

### api
#### injectable()
The injectable decorator marks a class as injectable, meaning that its dependencies can be resolved and injected by the Container.
```typescript
import { injectable, container } from './injectable';
class B {
  name = 'b'
}

@injectable()
class A {
  constructor(b: B) {}
}


const a = container.resolve(A)
console.log(a.b) // 'b'
```

#### singleton()
The singleton decorator marks a class as a singleton, meaning that the same instance will be used every time 
```typescript
import { singleton, container } from './injectable';
class B {
  name = 'b'
}

@singleton()
class A {
  constructor(b: B) {}
}

const a1 = container.resolve(A)
const a2 = container.resolve(A)

console.log(a1 === a2) // true
```
#### inject()
The inject decorator marks a constructor parameter as a dependency to be resolved and injected by the Container.
```typescript
import { inject, InjectToken } from './injectable';

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
```
