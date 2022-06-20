ProtoType Pattern은 기존 객체 템플릿을 기반으로 객체를 새성하는 패턴이다.

즉 다른 객체의 프로토타입 역할을 하는 객체를 생성하는 프로토타입 상속을 기반으로 한다.

ProtoType Pattern의 이점은 JavaScript의 ProtoType을 기반으로 작업한다는 것이다.

ES2015+에서는 클래스와 생성자를 이용하여 객체를 생성한다.

하지만 내부적으로는 함수와 프로토타입으로 컴파일된다.

실제 프로토타입 상속은`Object.create`사용이 필요하다.

`Object.create`는 지정된 프로토타입과 지정된 속성을 포함하는 객체를 만든다.

```js
const myCar = {
  name: "Ford Escort",

  drive() {
    console.log("Weeee. I'm driving!");
  },

  panic() {
    console.log("Wait. How do you stop this thing?");
  },
};

// Use Object.create to instantiate a new car
const yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name);
```

`Object.create` 의 두 번째 parameter를 제공하여 객체 속성을 초기화할 수 있다.

이는 `Object.defindProperties` 혹은 `Object.defineProperty`로도 구현할 수 있다.

```js
onst vehicle = {
    getModel() {
        console.log(`The model of this vehicle is..${this.model}`);
    },
};

const car = Object.create(vehicle, {
    id: {
        value: MY_GLOBAL.nextId(),
        // writable:false, configurable:false by default
        enumerable: true,
    },

    model: {
        value: 'Ford',
        enumerable: true,
    },
});
```

프로토타입 관계는 객체의 속성을 열거하여 `hasOwnProperty()`로 비교할 때에 문제를 일으킬 수 있다.

`Object.create`를 사용하지 않고 상속을 통해서 ProtoType Pattern을 구현할 수 있다.

```js
class VehiclePrototype {
  constructor(model) {
    this.model = model;
  }

  getModel() {
    console.log("The model of this vehicle is.." + this.model);
  }

  Clone() {}
}

class Vehicle extends VehiclePrototype {
  constructor(model) {
    super(model);
  }
  Clone() {
    return new Vehicle(this.model);
  }
}

const car = new Vehicle("Ford Escort");
const car2 = car.Clone();
car2.getModel();
```

프로토타입 패턴의 최종 구현은 다음과 같다.

```js
const beget = (() => {
  class F {
    constructor() {}
  }

  return (proto) => {
    F.prototype = proto;
    return new F();
  };
})();
```
