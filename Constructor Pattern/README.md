OOP 기반의 언어에서 생성자는 새로 생성된 객체를 초기화하는데에 사용되는 방법이다.

javascript에서 클래스는 prototype이라는 버킷을 상속받도록 구현되어있다.

객체 생성자는 특정 유형의 객체를 만드는 데 사용된다.

## 객체 생성

javascript(ES2015+)에서 객체를 만드는 세 가지 방법은 다음과 같다.

```js
const newObject = {};

const newObject = Object.create(Object.prototype);

const newObject = new Object();
```

객체의 key와 value를 할당하는 네 가지 방법은 다음과 같다.

```js
//1. Dot syntax
newObject.someKey = "Hello World";

const value = newObject.someKey;

//2. Square bracket syntax

newObject["Some Key"] = "Hello World";

const value = newObject["Some Key"];

// 3. Object.defineProperty

Object.defineProperty(newObject, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true,
});

const defineProp = (obj, key, value) => {
  const config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true,
  };
  Object.defineProperty(obj, key, config);
};

const person = Object.create(Object.prototype);

defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);

// 4. Object.defineProperties

Object.defineProperties(newObject, {
  someKey: {
    value: "Hello World",
    writable: true,
  },

  anotherKey: {
    value: "Foo bar",
    writable: false,
  },
});
```

또한 Object.create를 통해 클래스와 상속에도 사용할 수 있다.

```js
// Create a race car driver that inherits from the person object
const driver = Object.create(person);

// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");

// Get an inherited property (1981)
console.log(driver.dateOfBirth);

// Get the property we set (100mph)
console.log(driver.topSpeed);
```

하지만 ES2015 이후 클래스문법의 도입에 따라 javascript 객체용 템플릿을 정의하고 캡슐화 및 상속을 구현할 수 있게 되었다.

클래스는 `constructor()`라는 생성자를 필수로 정의해야한다.

```js
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}

let civic = new Car("Honda Civic", 2009, 20000);
let mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```
