모듈은 어플리케이션 아키텍처의 필수적인 부분이며 일반적으로 프로젝트의 코드 단위를 기능별로 분리하고 응집할 수 있도록 한다.

javascript에서는 주로 ES모듈을 사용한다.

모듈 패턴은 부분적으로 객체 리터럴을 기반으로 하므로, 먼저 객체 리터럴에 대한 개념이 필요하다.

## 객체 리터럴

객체 리터럴 표기법에서 개체는 중괄호로 묶인 쉼표로 구분된 key/value의 집합으로 설명된다.

key는 문자열 또는 식별자일 수 있다.

```js
const myObjectLiteral = {
  variableKey: variableValue,
  functionKey() {
    //...
  },
};
```

또한 객체 리터럴 외부에서 멤버를 객체에 추가할 수 있다.

```js
myObjectLiteral.functionKey2 = function () {
  //...
};
```

## 모듈 패턴

모듈 패턴은 클래스에 대해 개인,공개 캡슐화를 제공하는 방법이다.

개발자는 javascript 모듈을 사용하여 다른 파일로 내보내거나 가져올 수 있다. 이러한 방식은 다른 모듈에 포함된 클래스나 함수간 이름 충돌을 방지하는데도 도움이 된다.

### Privacy

모듈 패턴은 클로저를 사용하여 캡슐화한다.

이 패턴을 사용하면 공개 API만 반환되고 클로저 내의 다른 모든 것은 비공개로 유지된다.

```js
let counter = 0;

const testModule = {
  incrementCounter() {
    return counter++;
  },
  resetCounter() {
    console.log(`counter value prior to reset: ${counter}`);
    counter = 0;
  },
};

export default testModule;

// Usage:

import testModule from "./testModule";

testModule.incrementCounter();

// Outputs: counter value prior to reset: 1
testModule.resetCounter();
```

위의 코드에서 counter는 완전히 보호되는 private 변수처럼 작동한다. 해당 범위에 엑세스 할 수 있는 코드는 incrementCounter와 resetCounter로 제한된다.

모듈패턴으로 작업할 때와 다음과 같이 템플릿을 정의하는 것이 유용할 수 있다.

```js
let myPrivateVar = 0;

const myPrivateMethod = (foo) => {
  console.log(foo);
};

const myNamespace = {
  myPublicVar: "foo",

  myPublicFunction(bar) {
    myPrivateVar++;

    myPrivateMethod(bar);
  },
};

export default myNamespace;
```

외부에 공개하기 위한 template를 작성하여 관심사를 더욱 분리하였다.

모듈에서만 사용가능한 private함수와 private 멤버를 구현한 것과 같다.

나머지는 외부에 노출되지 않기 때문에 한층 더 private에 가깝다.

## WeakMap을 사용한 모듈 패턴

WeakMAP 객체는 key를 객체로 갖고 value를 임의의 값으로 가지는 key/value의 맵이다.
객체에 대한 활성참조가 없는 경우 GC의 대상이 된다.

모듈의 기본 구성은 다음과 같다.

```js
let _counter = new WeakMap();

class Module {
  constructor() {
    _counter.set(this, 0);
  }
  incrementCounter() {
    let counter = _counter.get(this);
    counter++;
    _counter.set(this, counter);

    return _counter.get(this);
  }
  resetCounter() {
    console.log(`counter value prior to reset: ${_counter.get(this)}`);
    _counter.set(this, 0);
  }
}

const testModule = new Module();
```

실제 적용한 예시는 다음과 같다.

```js
const basket = new WeakMap();
const doSomethingPrivate = new WeakMap();
const doSomethingElsePrivate = new WeakMap();

class BasketModule {
  constructor() {
    // privates
    basket.set(this, []);
    doSomethingPrivate.set(this, () => {
      //...
    });
    doSomethingElsePrivate.set(this, () => {
      //...
    });
  }
  doSomething() {
    doSomethingPrivate.get(this)();
  }
  doSomethingElse() {
    doSomethingElsePrivate.get(this)();
  }
  addItem(values) {
    const basketData = basket.get(this);
    basketData.push(values);
    basket.set(this, basketData);
  }
  getItemCount() {
    return basket.get(this).length;
  }
  getTotal() {
    return basket
      .get(this)
      .reduce((currentSum, item) => item.price + currentSum, 0);
  }
}
```

또한 즉시실행 함수를 통해 만들수도 있다.

```js
(function () {
  let counter = 0;

  function increment() {
    counter++;
  }

  function decrement() {
    counter--;
  }
  function getCount() {
    return counter;
  }
  return {
    increment,
    decrement,
    getCount,
  };
});
```

참조를 약하게 유지하여 활성참조가 없는경우 GC의 대상이 된다.

때문에 메모리 누수 관점에서 훨씬 메리트가 있는 것 같다.

모듈의 경우 객체리터럴을 기반으로 동작하기 때문에 WeakMap의 사용이 좋은 것 같다.

## 장점

1. 캡슐화에 가깝다.

2. private를 지원한다.

## 단점

1. public 및 private에 다르게 엑세스하기 때문에 수정을 위해선 실제로 해당 멤버가 사용된 각 위치를 변겨앻야 한다.

2. private 멤버에 대헤 단위테스트가 어려울 수 있다.
