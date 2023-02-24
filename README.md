
## install
```bash
npm install @lujs/di
```

### api
#### injectable
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

#### singleton
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
#### inject
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
