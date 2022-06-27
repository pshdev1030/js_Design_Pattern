Factory Pattern은 비슷한 객체를 반복해서 생성해야 할 경우 사용하는 패턴이다. 반복해서 객체를 생성하기 위한 인터페이스를 정의한다.

```js
const obj1 = {
  name: "박성현",
  age: 25,
  getInfo: function () {
    return `${this.name}은 ${this.age}살입니다.`;
  },
};

const obj2 = {
  name: "박성현2",
  age: 15,
  getInfo: function () {
    return `${this.name}은 ${this.age}살입니다.`;
  },
};
```

비슷한 객체를 생성하기 위해 이렇게 하나씩 생성할 경우 코드가 반복되고 변경사항이 생기면 모든 객체를 찾아 수정해야한다.

이러한 단점을 개선하기 위해 factory pattern을 적용할 수 있다.

```js
const factory = function (param) {
  return {
    name: param.name,
    age: param.age,
    getInfo: function () {
      return `${this.name}은 ${this.age}살입니다.`;
    },
  };
};

const obj1 = factory({ name: "박성현", age: 25 });
const obj2 = factory({ name: "박성현2", age: 15 });
```

이렇게 생성할 경우 getInfo메소드가 객체를 생성할 때마다 추가되게 된다.

이는 Prototype을 통해 해결할 수 있다.

```js
class Obj {
  constructor(param) {
    this.name = param.name;
    this.age = param.age;
  }

  getInfo() {
    return `${this.name}은 ${this.age}살입니다.`;
  }

  static factory(name) {
    if (name === "박성현") {
      return new Obj1();
    }
    if (name === "박성현2") {
      return new Obj2();
    }
  }
}

class Obj1 extends Obj {
  constructor() {
    super({ name: "박성현", age: 25 });
  }
}

class Obj2 extends Obj {
  constructor() {
    super({ name: "박성현2", age: 15 });
  }
}

const ins1 = Obj.factory("박성현");
const ins2 = Obj.factory("박성현2");
```

Class 문법을 사용해서 정의해보았다.

서브클래스가 어떤 인스턴스를 생성할지 정보를 결정하도록 factory 메소드를 정의하였다.

또한 다른 유형으로 Abstract Factory Pattern도 있다.

객체의 사용법과 객체 집합의 세부사항을 구분한다.

시스템이 정의하는 객체가 생성되는 방식과 독립적이어야 하거나 여러 유형의 객체가 함께 작동하는 경우에 사용해야 한다.

```js
class ObjFactory {
  static types = {};
  constructor() {}

  static getObj(type, option) {
    const obj = this.types[type];
    return obj ? new Obj(option) : null;
  }

  static registerObj(type, Obj) {
    if (Obj.name && Obj.age) {
      this.types[type] = Obj;
    }
  }
}

const ins1 = Obj.factory("박성현");
ObjFactory.registerObj("a", ins1);
```

static 키워드는 클래스를 인스턴스화하지 않고 호출되며 클래스 인스턴스의 메소드로 호출할 수 없어 주로 유틸리티 기능을 만들 때 사용된다.

위의 코드에서는 나이와 이름을 prototype에 가진 Obj를 types에 등록하여 관리할 수 있도록 하였다.
