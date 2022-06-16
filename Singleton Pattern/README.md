Singleton Pattern은 클래스의 인스턴스화를 하나의 객체로 제한하는 패턴이다.

이는 시스템 전체에서 정확히 하나의 개체가 필요한 경우에 유용하다.

보통 Singleton Pattern은 인스턴스가 존재하지 않는 경우 새로운 인스턴스를 생성하여 반환하고, 인스턴스가 존재하는 경우 해당 인스턴스에 대한 참조를 반환한다.

Singleton은 한 번 인스턴스화 되는 클래스의 전역 인스턴스를 생성할 수 있다.

인스턴스는 module export를 통해 노출된다.

이는 인스턴스에 대한 접근을 더욱 명시적으로 제어할 수 있으며 다른 전역 변수들과 구분되게 한다.

새 인스턴스를 만들 수는 없지만 클래스에 정의된 public get 및 set 메소드를 사용하여 인스턴스를 읽고 수정할 수 있다.

아래의 예시를 통해 올바르게 작성된 싱글톤과 잘못 작성된 싱글톤을 비교해보자

```js
// 올바르게 작성된 싱글톤
let instance = null;

const privateMethod = () => {
  console.log("I am private");
};

const privateVariable = "Im also private";
const randomNumber = Math.random();

class MySingleton {
  constuctor() {
    if (!instance) {
      this.publicProperty = "I am also public";
      instance = this;
    }

    return instance;
  }

  publicMethod() {
    console.log("The public can see me!");
  }

  getRandomNumber() {
    return randomNumber;
  }
}

export default MySingleton;
```

올바르게 작성된 싱글톤이다. 메소드와 하나의 인스턴스를 전역에서 private로 관리하여 공개 모듈 패턴을 통해 외부로 노출한다.

```js
// 잘못 작성된 싱글톤
class MyBadSingleton {
  // 매번 새로운 인스턴스를 생성한다.
  constructor() {
    this.randomNumber = Math.random();
    instance = this;

    return instance;
  }

  getRandomNumber() {
    return this.randomNumber;
  }
}

export default MyBadSingleton;
```

잘못 작성된 싱글톤이다. 매번 새로운 인스턴스를 생성한다. 2개 이상의 인스턴스가 존재할 수 있다.

실행결과를 통해 비교해보자.

```js
import MySingleton from "./MySingleton";
import MyBadSingleton from "./MyBadSingleton";

const singleA = new MySingleton();
const singleB = new MySingleton();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

const badSingleA = new MyBadSingleton();
const badSingleB = new MyBadSingleton();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true
```

올바르게 작성된 MySingleton의 경우 randomNumber를 private에서 하나만 존재하도록 private로 관리하기 때문에 비교에서 true를 반환하지만 MyBadSingleton 클래스는 인스턴스가 여러개 존재할 수 있고 그렇게 생성된 인스턴스 내부가 각기 다른 randomNumber를 가지기 때문에 비교에서 false를 반환한다.

GOF에선 Singleton 패턴의 적용 가능성을 다음과 같이 설명한다.

- 클래스의 인스턴스는 정확히 하나만 있어야 하며 잘 알려진 액세스 지점에서 클라이언트가 접근할 수 있어야한다.

- 하나만 존재하는 인스턴스가 상속을 통해 확장할 수 있어야 하며 클라이언트는 코드를 수정하지 않고 확장된 인스턴스를 사용할 수 있어야 한다.

말이 좀 어려운데 코드를 보면 이해에 도움이 된다.

```js
constructor() {
    if (this._instance == null) {
        if (isFoo()) {
            this._instance = new FooSingleton();
        } else {
            this._instance = new BasicSingleton();
        }
    }
    return this._instance;
}
```

FooSingleton은 BasicSingleton과 동일한 인터페이스의 하위 클래스이다.

이와같이 코드를 수정하지 않고 `isFoo()`의 결과에 따라 생성된 인스턴스에 접근할 수 있다.

Singleton은 정적 인스턴스로 구현될 수 있지만 실제로 필요할 때까지 리소스나 메모리가 필요 없을 수 있다.

마지막으로 다음은 싱글톤 패턴의 한 예시이다.

```js
class Singleton {
  constructor(options = {}) {
    this.name = "SingletonTester";
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }
}

let instance;

const SingletonTester = {
  name: "SingletonTester",
  getInstance(options) {
    if (instance === undefined) {
      instance = new Singleton(options);
    }
    return instance;
  },
};

const singletonTest = SingletonTester.getInstance({
  pointX: 5,
});

// Outputs: 5
console.log(singletonTest.pointX);
```

## 여담

instance가 없을 경우 instance를 생성하는 과정에서 Object.freeze 메소드를 통해 속성을 추가하지 못하도록 보호해도 괜찮을 것 같다.
