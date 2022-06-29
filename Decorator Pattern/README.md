Decorator Pattern은 기본코드를 수정하지 않고 객체에 기능 추가를 하기위한 패턴이다.

주로 Javascript의 클래스 문법을 사용한다.

```js
class MacBook {
  constructor() {
    this.cost = 997;
    this.screenSize = 11.6;
  }
  getCost() {
    return this.cost;
  }
  getScreenSize() {
    return this.screenSize;
  }
}

class Memory extends MacBook {
  constructor(macBook) {
    super();
    this.macBook = macBook;
  }

  getCost() {
    return this.macBook.getCost() + 75;
  }
}

class Engraving extends MacBook {
  constructor(macBook) {
    super();
    this.macBook = macBook;
  }

  getCost() {
    return this.macBook.getCost() + 200;
  }
}

class Insurance extends MacBook {
  constructor(macBook) {
    super();
    this.macBook = macBook;
  }

  getCost() {
    return this.macBook.getCost() + 250;
  }
}

let mb = new MacBook();

mb = new Memory(mb);
mb = new Engraving(mb);
mb = new Insurance(mb);

// Outputs: 1522
console.log(mb.getCost());

// Outputs: 11.6
console.log(mb.getScreenSize());
```

MacBook 객체를 받아 cost 함수를 재정의하여 업그레이드 비용을 더한 값을 반환한다.

상속을 통해 오버라이딩 한다고 생각하면 될 것 같다.

Abstract Decorator Pattern은 이렇게 필요한 서브클래스를 정의하기위한 인터페이스를 정의해주는 패턴이다.

```js
class MacbookPro {
  // implements Macbook
}

MacbookPro.prototype = {
  addEngraving() {},
  addParallels() {},
  add4GBRam() {},
  add8GBRam() {},
  addCase() {},
  getPrice() {
    return 900.0;
  },
};
```

필요한 만큼 옵션을 추가하기 위한 Decorator 클래스를 메서드로 정의하였다.

이후 데코레이터를 정의한다.

```js
class MacbookDecorator {
  constructor(macbook) {
    Interface.ensureImplements(macbook, Macbook);
    this.macbook = macbook;
  }

  addEngraving() {
    return this.macbook.addEngraving();
  }

  addParallels() {
    return this.macbook.addParallels();
  }

  add4GBRam() {
    return this.macbook.add4GBRam();
  }

  add8GBRam() {
    return this.macbook.add8GBRam();
  }

  addCase() {
    return this.macbook.addCase();
  }

  getPrice() {
    return this.macbook.getPrice();
  }
}
```

이 데코레이터를 상속받아 필요한 메소드를 재정의하면 된다.

```js
class CaseDecorator extends MacbookDecorator {
  constructor(macbook) {
    super(macbook);
  }

  addCase() {
    return `${this.macbook.addCase()}Adding case to macbook`;
  }

  getPrice() {
    return this.macbook.getPrice() + 45.0;
  }
}
```

```js
const myMacbookPro = new MacbookPro();

// Outputs: 900.00
console.log(myMacbookPro.getPrice());

// Decorate the macbook
const decoratedMacbookPro = new CaseDecorator(myMacbookPro);

// This will return 945.00
console.log(decoratedMacbookPro.getPrice());
```

필요한 메소드를 추상화해둔 클래스를 만들고, 이를 상속받아 쉽게 확장할 수 있다.
